"use strict";

const {
  queryPassword,
  queryUser,
  queryUserData,
  queryUpdatePassword,
  queryFindOrCreateUser,
} = require("../modules/database");

const express = require("express");
const url = require("url");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

const RESET_CACHE = {
  "arthurM@gmail.com": {
    token: "bda58249347d976218dc9801bfb656e016cc02c5f7cd4e64a1b4b17063b7605c",
    resetExpiration: Date.now() + 600000,
  },
};

let transporter = nodemailer.createTransport({
  secure: false,
  port: 465,
  service: "gmail",
  auth: {
    user: process.env.OKR_EMAIL,
    pass: process.env.OKR_PASSWORD,
  },
});

passportInit();

const postLogin = async (req, res, next) => {
  const authenticate = passport.authenticate(
    "local",
    { session: false },
    async (err, user) => {
      if (err || !user) return res.sendStatus(401);
      try {
        const userData = await queryUserData(req.body.email);
        const payload = {
          email: req.body.email,
          user_id: userData[0].id,
          expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
        };

        return req.login(payload, { session: false }, async (err) => {
          if (err) return res.sendStatus(400);
          userData[0].expiration = new Date(Date.now() + 8 * 3600000);
          userData[0].authorized = true;
          const token = jwt.sign(payload, process.env.secret);
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 8 * 3600000),
          });
          return res.status(200).json(userData[0]);
        });
      } catch (err) {
        return res.status(500).send(err);
      }
    }
  );
  return authenticate(req, res, next);
};

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const callback = async (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false, failureRedirect: "/login" },
    (err, user) => {
      if (err || !user) return res.sendStatus(401);
      const payload = {
        email: user.email,
        user_id: user.id,
        expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
      };
      const token = jwt.sign(payload, process.env.secret);
      res.cookie("jwt", token, { expires: new Date(Date.now() + 8 * 3600000) });
      return res.redirect(
        url.format({
          pathname: "http://127.0.0.1:8080/login-success",
          query: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
            authorized: true,
            expiration: new Date(Date.now() + 8 * 3600000).toISOString(),
          },
        })
      );
    }
  )(req, res, next);
};

const postLogout = async (req, res) => {
  res.cookie("jwt", req.cookies.jwt, { expires: new Date(Date.now()) });
  return res.sendStatus(200);
};

function passportInit() {
  app.use(passport.initialize());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      localStrategy
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        // passReqToCallback: true
      },
      googleStrategy
    )
  );
}

async function googleStrategy(_, __, profile, done) {
  try {
    const { familyName, givenName } = profile.name;
    const email = profile.emails[0].value;
    const userData = await queryFindOrCreateUser(givenName, familyName, email);
    return done(null, userData[0]);
  } catch (err) {
    return done(err);
  }
}

async function localStrategy(email, password, done) {
  try {
    const [{ password_hash }] = await queryPassword(email);
    const match = await bcrypt.compare(password, password_hash);

    if (match) return done(null, "hooray!");
    else
      return done(null, false, {
        message: "Invalid user and password combination.",
      });
  } catch (err) {
    return done(err);
  }
}

const postPasswordReset = async (req, res) => {
  const email = req.body.email;
  let token;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.sendStatus(500);
    }
    token = buffer.toString("hex");
  });

  try {
    const user = await queryUser(email);
    if (!user) return res.sendStatus(204);
    RESET_CACHE[email] = {
      resetToken: token,
      resetExpiration: Date.now() + 600000,
    };
    await transporter.sendMail({
      to: "emcclosky@gmail.com",
      from: process.env.OKR_EMAIL,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>Hi ${email},</p>
        </br>
        <p>Someone has requested a new password for the following account: ${email}</p>
        <p>If you didn't make this request, just ignore this email.</p>
        <p>If you'd like to reset your password click <a href="http://localhost:8080/password-reset/${token}?user=${email}">here</a></p>
      `,
    });
    res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const getNewPassword = (req, res) => {
  const token = req.params.token;
  const user = req.query.user;

  if (!(user in RESET_CACHE)) return res.sendStatus(404);
  else {
    const currentUser = RESET_CACHE[user];
    if (
      currentUser.token === token &&
      currentUser.resetExpiration >= Date.now()
    )
      return res.sendStatus(200);
    else return res.sendStatus(401);
  }
};

const postNewPassword = async (req, res) => {
  const { password, email } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const updatedData = await queryUpdatePassword(passwordHash, email);
    if (!("user_id" in updatedData[0])) return sendStatus(500);
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.postLogin = postLogin;
exports.postLogout = postLogout;
exports.postPasswordReset = postPasswordReset;
exports.getNewPassword = getNewPassword;
exports.postNewPassword = postNewPassword;
exports.googleAuth = googleAuth;
exports.callback = callback;

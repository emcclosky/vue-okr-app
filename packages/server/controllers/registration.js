"use strict";

const { query } = require("../modules/database");
const bcrypt = require("bcryptjs");

const postRegistration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //TODO: up the cost to 20
    const passwordHash = await bcrypt.hash(password, 12);

    const insertUser = `WITH new_user AS (
          insert into users (first_name, last_name, email)
          VALUES ($1, $2, $3)
          RETURNING id
          )
          INSERT INTO passwords (password_hash, user_id)
          VALUES ($4, (SELECT id FROM new_user));
      `;

    await query(insertUser, [firstName, lastName, email, passwordHash]);
    return res.sendStatus(201);
  } catch (err) {
    const errorCodeIndex = err.message.indexOf("code");
    const errorCode = err.message.slice(errorCodeIndex);
    if (errorCode.includes("23505")) return res.status(409).send(err);
    else return res.sendStatus(400);
  }
};

exports.postRegistration = postRegistration;

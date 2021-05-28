"use strict";

require("dotenv").config();

/* external deps */
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cookieParser = require("cookie-parser");

/* route handlers */
const okrRoutes = require("./routes/okr");
const keyResultsRoutes = require("./routes/keyResults");
const registrationRoutes = require("./routes/registration");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//TODO: Need to update origin value
app.use(cors({ origin: true, credentials: true }));

app.use(authRoutes);
app.use(registrationRoutes);
app.use(okrRoutes);
app.use(keyResultsRoutes);
app.use(userRoutes);

app.use(history());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(process.env.PORT || 8080, () => {
  console.log(`server listening on port: ${process.env.PORT || 8080}`);
});

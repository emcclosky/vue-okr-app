"use strict";

const { query } = require("../modules/database");

export const postProfile = async (req, res) => {
  const userId = res.locals.user_id;
  const { firstName, lastName, email } = req.body;
  try {
    const updateProfile = `
          UPDATE users
            SET first_name = $1,
            last_name = $2,
            email = $3
          WHERE users.id = CAST($4 as integer)
          RETURNING *;
      `;
    const updatedProfile = await query(updateProfile, [
      firstName,
      lastName,
      email,
      userId,
    ]);
    return res.status(200).json(updatedProfile);
  } catch (err) {
    return res.status(500).send("Error in trying to retrieve Okrs");
  }
};

exports.tests = {
  postProfile,
};

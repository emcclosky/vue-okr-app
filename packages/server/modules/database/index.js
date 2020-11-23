require("dotenv").config();

const { Pool } = require('pg');
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'okrs',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  })


const query = async (text, values) => {
    let client;
    try {
      client = await pool.connect();
      const data = await client.query(text, values);
      return data.rows;
    } catch (err) {
      console.error('Error from db call: ', err);
      throw new Error( `messge: ${err.message}, code: ${err.code}` );
    } finally {
      client.release();
    }
};

exports.queryPassword = (email) => {
  const getHashedPassword = `
      SELECT pt.password_hash, pt.user_id FROM passwords pt
      INNER JOIN users AS ut ON (pt.user_id = ut.id)
      WHERE ut.email = $1;
  `;
 return query(getHashedPassword, [ email ]);
};

exports.queryUpdatePassword = (password, email) => {
  const updatePassword = `
    UPDATE passwords
    SET password_hash = $1
    WHERE (SELECT id from users WHERE email = $2) = passwords.user_id
    returning *;
  `;
  return query(updatePassword, [ password, email ]);
};

exports.queryUser = (email) => {
  const queryUser = `
    SELECT email FROM users
    WHERE users.email = $1;
  `;
  return query(queryUser, [ email ]);
};

exports.queryUserData = (email) => {
  const queryUserData = `
    SELECT email, first_name, last_name, id FROM users
    WHERE users.email = $1;
  `;
  return query(queryUserData, [ email ]);
};

exports.queryFindOrCreateUser = (firstName, lastName, email) => {
  const queryFindOrCreateUser = `
  INSERT INTO users (first_name, last_name, email)
    VALUES ($1, $2, $3)
  ON CONFLICT(email) DO UPDATE SET first_name = $1
  RETURNING id, email, first_name, last_name;`
  return query(queryFindOrCreateUser, [ firstName, lastName, email ]);
}

exports.query = query;
"use strict";

const { query } = require("../modules/database");

export const postKeyResult = async (req, res) => {
  const { objectiveId, result, completionRate } = req.body;

  try {
    const insertKeyResults = `
            INSERT into key_results (objective_id, result, completion_rate)
            VALUES ($1, $2, $3);
        `;
    query(insertKeyResults, [objectiveId, result, completionRate]);
    return res.sendStatus(201);
  } catch (error) {
    console.error("error: ", error);
  }
};

exports.tests = {
  postKeyResult,
};

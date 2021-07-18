'use strict';

const { query } = require('../modules/database');
const logger = console;

const postKeyResult = (logger) => async (req, res) => {
    const {
        objectiveId,
        result,
        completionRate,
    } = req.body;

    try {
        const insertKeyResults = `
            INSERT into key_results (objective_id, result, completion_rate)
            VALUES ($1, $2, $3);
        `;
        await query(insertKeyResults, [objectiveId, result, completionRate]);
        return res.sendStatus(201);
    } catch(error) {
        console.error('error: ', error)
    }
}

const deleteKeyResult = (logger) => async (req, res) => {
    const krId = req.params.krId;

    try {
        const deleteKeyResults = `
            DELETE FROM key_results
            where id = $1;
        `;
        await query(deleteKeyResults, [krId]);
        return res.sendStatus(202);
    } catch(error) {
        console.error('error: ', error)
    }
}


exports.postKeyResult = postKeyResult(logger);
exports.deleteKeyResult = deleteKeyResult(logger);

exports.tests = {
    postKeyResult,
    deleteKeyResult
}

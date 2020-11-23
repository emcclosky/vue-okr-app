'use strict';

const { query } = require('../modules/database');
const logger = console;

const getOkrs = (logger) => async (req, res) => {
    const userId = res.locals.user_id;
    try{
        const selectOkrs = `
            SELECT ob.*, json_agg(kr.*) AS key_results
            FROM objectives AS ob
            INNER JOIN key_results AS kr ON (ob.id=kr.objective_id)
            WHERE ob.user_id = $1 group by ob.id;
        `;
        const okrs = await query(selectOkrs, [userId]);
        return res.status(200).json(okrs);
    } catch(err){
        logger.error(err);
        return res.status(500).send('Error in trying to retrieve Okrs');
    }
}

const getOkr = (logger) => async (req, res) => {
    const { okrId } = req.params;
    const selectOkr = `
        SELECT ob.*, json_agg(kr.*) AS key_results
        FROM objectives AS ob
        INNER JOIN key_results AS kr ON (ob.id=kr.objective_id)
        WHERE ob.id = ${okrId} GROUP BY ob.id;
    `
    try {
        const okr = await query(selectOkr);
        return res.status(200).json(okr);
    } catch(err) {
        logger.error(err);
        return res.status(500).send('Error in trying to retrieve Okr');
    }
}

const postOkr = (logger) => async (req, res) => {
    const {
        objective,
        description,
        completionRate,
        user_id,
        keyResults
    } = req.body;

    try {
        const insertObjective = `
            INSERT into objectives (objective, description, completion_rate, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;

        const objectiveId = await query(insertObjective, [
            objective,
            description,
            completionRate,
            user_id,
        ]);

        const { valuesPlaceholders, actualValues } = parseKeyResultValues(keyResults, objectiveId[0].id);

        const insertKeyResults = `
            INSERT into key_results (objective_id, result, completion_rate)
            VALUES
            ${valuesPlaceholders.join(',')}
        `;

        await query(insertKeyResults, actualValues);
        return res.sendStatus(201);
    } catch(err) {
        logger.error(err);
        return res.status(500).send("Error in creating Okr");
    }
}

const putOkr = (logger) => async (req, res) => {
    const {
        id,
        objective,
        description,
        completionRate,
        keyResults
    } = req.body;

    const { updates, inserts } = keyResults.reduce((acc, kr) => {
        if(kr.id) acc.updates.push(kr);
        else acc.inserts.push(kr);
        return acc;
    }, {updates: [], inserts: []});

    const { valuesPlaceholders, actualValues } = parseKeyResultValues(updates);
    const { valuesPlaceholders: insertValuesPlaceholder, actualValues: insertActualValues } =  parseKeyResultValues(inserts, id);

    const updateKR = `
        UPDATE key_results AS kr
            SET result = kr2.result,
            completion_rate = CAST(kr2.completion_rate AS integer)
        FROM (VALUES
            ${valuesPlaceholders.join(',')}
        ) AS kr2(id, result, completion_rate)
        WHERE kr.id = CAST(kr2.id as integer);
    `;

    const insertKR = `
        INSERT INTO key_results (objective_id, result, completion_rate)
        VALUES
        ${insertValuesPlaceholder.join(',')}
    `;

    const updateObjective = `
        UPDATE objectives AS ob
        SET objective = $1,
            description = $2,
            completion_rate = $3
        WHERE ob.id = $4;
    `;

    try {
        await query(updateKR, actualValues);
        await query(insertKR, insertActualValues);
        await query(updateObjective, [objective, description, completionRate, id]);
        return res.sendStatus(200);
    } catch(err) {
        logger.error(err);
        return res.status(500).send('Error in trying to edit Okr');
    }
}

const deleteOkr = (logger) => async (req, res) => {
    const okrId = req.params.okrId;
    const userId = res.locals.user_id;
    const deleteOkr = `
    DELETE FROM objectives
    WHERE id = ${okrId};
    `
    try {
        await query(deleteOkr);
        const selectOkrs = `
        SELECT ob.*, json_agg(kr.*) AS key_results
        FROM objectives AS ob
        INNER JOIN key_results AS kr ON (ob.id = kr.objective_id)
        WHERE ob.user_id = $1
        GROUP BY ob.id;
    `
        const okrs = await query(selectOkrs, [ userId ]);
        return res.status(200).json(okrs);
    } catch(err) {
        logger.error(err);
        return res.status(500).send('Error in trying to delete Okr');
    }
}

/**
 * Helper fn for building placeholder array ($1, $2...) in the query,
 * and the actual values array that will be passed to the query fn.
 * @param {Array} keyResults
 * @param {Number} objectiveId
 */
function parseKeyResultValues(keyResults, objectiveId) {
    let iter = 0;
    return keyResults.reduce((acc, {id, result, completion_rate}) => {
        acc.actualValues = acc.actualValues.concat([id || objectiveId, result, completion_rate]);
        acc.valuesPlaceholders.push(`($${++iter}, $${++iter}, $${++iter})`);
        return acc;
    }, {valuesPlaceholders: [], actualValues: []});
}

exports.getOkrs = getOkrs(logger);
exports.getOkr = getOkr(logger);
exports.postOkr = postOkr(logger);
exports.putOkr = putOkr(logger);
exports.deleteOkr = deleteOkr(logger);

exports.tests = {
    getOkrs,
    getOkr,
    postOkr,
    putOkr,
    deleteOkr
}

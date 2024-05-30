const express = require('express');
const dbClient = require('../db/dbClient');
const router = express.Router();

// read all functions
router.get('/variables', (req, res) => {
    dbClient.query('SELECT * FROM public.variables', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

// create function
router.post('/variables', (req, res) => {
    const { variableName, pageId_fk, variableExp } = req.body;
    const query =
        'INSERT INTO public.variables ("variableName", "pageId_fk", "variableExp") VALUES ($1, $2) RETURNING *';
    const values = [variableName, pageId_fk, variableExp];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to insert data');
        } else {
            res.status(201).json(queryRes.rows[0]); // 새로 추가된 프로젝트 반환
        }
    });
});

// update function
router.put('/variables/:id', (req, res) => {
    const vairableId = req.params.id;
    const { variableName, variableExp } = req.body;
    const query =
        'UPDATE public.variables SET "variableName" = $1, "variableExp" = $2 WHERE "functionId" = $3 RETURNING *';
    const values = [variableName, variableExp];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to update data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('page not found');
        } else {
            res.status(200).json(queryRes.rows[0]); // 업데이트된 프로젝트 반환
        }
    });
});

// delete function
router.delete('/vairables/:id', (req, res) => {
    const vairableId = req.params.id;
    const query =
        'DELETE FROM public.variables WHERE "vairableId" = $1 RETURNING *';
    const values = [vairableId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to delete data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('page not found');
        } else {
            res.status(200).json(queryRes.rows[0]); // 삭제된 프로젝트 반환
        }
    });
});

// read certain function
router.get('/variables/pages/:pageId', (req, res) => {
    const variableId = req.params.projectId;
    const query = 'SELECT * FROM public.variables WHERE "pageId" = $1';
    const values = [variableId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

module.exports = router;

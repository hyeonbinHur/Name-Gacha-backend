import express from 'express';
import dbClient from '../db/dbClient.js';

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
        'INSERT INTO public.variables ("variableName", "pageId_fk", "variableExp") VALUES ($1, $2, $3) RETURNING *';
    const values = [variableName, pageId_fk, variableExp];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to insert data');
        } else {
            res.status(201).json(queryRes.rows[0]);
        }
    });
});

// update function
router.put('/variables/:id', (req, res) => {
    const variableId = req.params.id;
    const { variableName, variableExp } = req.body;
    const query =
        'UPDATE public.variables SET "variableName" = $1, "variableExp" = $2 WHERE "variableId" = $3 RETURNING *';
    const values = [variableName, variableExp, variableId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to update data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('page not found');
        } else {
            res.status(200).json(queryRes.rows[0]);
        }
    });
});

// delete function
router.delete('/variables/:id', (req, res) => {
    const variableId = req.params.id;
    const query =
        'DELETE FROM public.variables WHERE "variableId" = $1 RETURNING *';
    const values = [variableId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to delete data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('page not found');
        } else {
            res.status(200).json(queryRes.rows[0]);
        }
    });
});

// read certain variables
router.get('/variables/pages/:pageId', (req, res) => {
    const pageId = req.params.pageId;
    const query = 'SELECT * FROM public.variables WHERE "pageId_fk" = $1';
    const values = [pageId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

export default router;

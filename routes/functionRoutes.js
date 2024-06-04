import express from 'express';
import dbClient from '../db/dbClient.js';
const router = express.Router();

// read all functions
router.get('/functions', (req, res) => {
    dbClient.query('SELECT * FROM public.functions', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

// create function
router.post('/functions', (req, res) => {
    const { functionName, pageId_fk, functionExp } = req.body;
    const query =
        'INSERT INTO public.functions ("functionName", "pageId_fk", "functionExp") VALUES ($1, $2, $3) RETURNING *';
    const values = [functionName, pageId_fk, functionExp];

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
router.put('/functions/:id', (req, res) => {
    const functionId = req.params.id;
    const { functionName, functionExp } = req.body;
    const query =
        'UPDATE public.functions SET "functionName" = $1, "functionExp" = $2 WHERE "functionId" = $3 RETURNING *';
    const values = [functionName, functionExp, functionId];

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
router.delete('/functions/:id', (req, res) => {
    const functionId = req.params.id;
    const query =
        'DELETE FROM public.functions WHERE "functionId" = $1 RETURNING *';
    const values = [functionId];

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
router.get('/functions/pages/:pageId', (req, res) => {
    const pageId = req.params.pageId;
    const query = 'SELECT * FROM public.functions WHERE "pageId_fk" = $1';
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

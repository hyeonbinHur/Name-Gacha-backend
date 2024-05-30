const express = require('express');
const dbClient = require('../db/dbClient');

const router = express.Router();

// read all pages
router.get('/pages', (req, res) => {
    dbClient.query('SELECT * FROM public.pages', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

// create pages
router.post('/pages', (req, res) => {
    const { pageName, projectId } = req.body;
    const query =
        'INSERT INTO public.pages ("pageName", "projectId") VALUES ($1, $2) RETURNING *';
    const values = [pageName, projectId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to insert data');
        } else {
            res.status(201).json(queryRes.rows[0]); // 새로 추가된 프로젝트 반환
        }
    });
});

// update project
router.put('/pages/:id', (req, res) => {
    const pageId = req.params.id;
    const { pageName } = req.body;
    const query =
        'UPDATE public.pages SET "pageName" = $1 WHERE "pageId" = $2 RETURNING *';
    const values = [pageName, pageId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to update data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).json(queryRes.rows[0]); // 업데이트된 프로젝트 반환
        }
    });
});

module.exports = router;
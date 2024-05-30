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

module.exports = router;

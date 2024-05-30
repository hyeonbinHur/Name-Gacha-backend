const express = require('express');
const dbClient = require('../db/dbClient');

const router = express.Router();

router.get('/projects', (req, res) => {
    dbClient.query('SELECT * FROM public.projects', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

// POST 요청: 새로운 프로젝트 추가
router.post('/projects', (req, res) => {
    const { projectName } = req.body;
    const query =
        'INSERT INTO public.projects ("projectName") VALUES ($1) RETURNING *';
    const values = [projectName];

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

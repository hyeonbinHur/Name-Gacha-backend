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

router.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const query =
        'DELETE FROM public.projects WHERE "projectId" = $1 RETURNING *';
    const values = [projectId];

    dbClient.query(query, values, (err, queryRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).send('Failed to delete data');
        } else if (queryRes.rowCount === 0) {
            res.status(404).send('Project not found');
        } else {
            res.status(200).json(queryRes.rows[0]); // 삭제된 프로젝트 반환
        }
    });
});

module.exports = router;

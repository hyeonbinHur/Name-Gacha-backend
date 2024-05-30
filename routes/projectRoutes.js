const express = require('express');
const dbClient = require('../db/dbClient');

const router = express.Router();

router.get('/time', (req, res) => {
    dbClient.query('SELECT NOW()', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database query failed');
        } else {
            res.send('Current time: ' + queryRes.rows[0].now);
        }
    });
});

router.get('/project', (req, res) => {
    dbClient.query('SELECT * FROM public.projects', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 8000;

// PostgreSQL connection setup
const dbClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Gjgusqls1!',
    database: 'NameGachaDatabase',
});

// Connect to the database
dbClient.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database', err.stack);
    } else {
        console.log('Database connected');
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get current time (example you had)
app.get('/time', (req, res) => {
    dbClient.query('SELECT NOW()', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database query failed');
        } else {
            res.send('Current time: ' + queryRes.rows[0].now);
        }
    });
});

// New endpoint to get data from the 'test' table
app.get('/test-data', (req, res) => {
    dbClient.query('SELECT * FROM public.test', (err, queryRes) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve data');
        } else {
            res.json(queryRes.rows);
        }
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

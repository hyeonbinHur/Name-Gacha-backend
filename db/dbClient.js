import * as dotenv from 'dotenv';

const { Client } = require('pg');

const dbClient = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
});

dbClient.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database', err.stack);
    } else {
        console.log('Database connected');
    }
});

module.exports = dbClient;

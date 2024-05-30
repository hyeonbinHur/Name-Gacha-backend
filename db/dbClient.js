const { Client } = require('pg');

const dbClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Gjgusqls1!',
    database: 'NameGachaDatabase',
});

dbClient.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database', err.stack);
    } else {
        console.log('Database connected');
    }
});

module.exports = dbClient;

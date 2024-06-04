import * as dotenv from 'dotenv';
import pg from 'pg'; // pg 모듈 전체를 기본 import로 불러옵니다.

// 환경 변수를 로드합니다.
dotenv.config();

const { Client } = pg;
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

export default dbClient;

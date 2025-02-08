import * as dotenv from "dotenv";
import pg from "pg"; // pg 모듈 전체를 기본 import로 불러옵니다.
// 환경 변수를 로드합니다.
dotenv.config();
const { Client } = pg;
const dbClient = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbClient.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database", err.stack);
  } else {
    console.log("Database connected");
  }
});

export default dbClient;

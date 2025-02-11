import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // 연결이 없으면 대기
  connectionLimit: 10, // 최대 연결 수
  queueLimit: 0, // 대기열 크기
});

export default connection;

import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import functionRoutes from './routes/functionRoutes.js';
import variableRoutes from './routes/variableRoutes.js';
import allTogetherRoutes from './routes/allTogetherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = 8080;
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:5173/auth'],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use the routes defined in projectRoutes.js
app.use(
    '/namegacha/api',
    projectRoutes,
    pageRoutes,
    functionRoutes,
    variableRoutes,
    allTogetherRoutes,
    authRoutes
);
app.listen(port, () => console.log(`Server running on port ${port}`));

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});
// openai.beta.assistants.create({
//     name: 'NameGacha',
//     instructions: 'You need to suggest 9 names of variable or function',
//     tools: [
//         {
//             type: 'code_interpreter',
//         },
//     ],

//     model:
// });

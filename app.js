import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import functionRoutes from './routes/functionRoutes.js';
import variableRoutes from './routes/variableRoutes.js';
import allTogetherRoutes from './routes/allTogetherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import aiRoutes from './ai/assistant.js';

// import { OpenAI } from 'openai';

// const openai = new OpenAI({
//     apiKey:
// });

// const assistant = await openai.beta.assistants.create({
//     name: 'nameGacha AI',
//     instructions:
//         "Objective:You are required to generate nine possible names for a function or variable based on the description provided by the user. After generating these names, you will also provide a brief explanation (one or two sentences) describing the suitability or relevance of these names.Input from User: The user will provide:A brief description or definition of the function or variable.The desired naming convention (e.g., camelCase, PascalCase, snake_case).Output Requirements:Names: Suggest nine potential names that fit the user's description and specified naming convention.Explanation: Provide a general explanation (one sentence) that relates to all suggested names, explaining how they match the function or variable's purpose.",
//     tools: [
//         {
//             type: 'code_interpreter',
//         },
//     ],
//     model: 'gpt-4o',
// });

// const thread = await openai.beta.threads.create();
// console.log(thread);
// const message = await openai.beta.threads.messages.create(thread.id, {
//     role: 'user',
//     content:
//         'function name, calmel case, check the whether character is dead or not',
// });

// const run = await openai.beta.threads.runs.create(thread.id, {
//     assistant_id: assistant.id,
//     instructions: 'Address the user as developer',
// });

// const run = await openai.beta.threads.runs.retrieve(
//     'thread_auTuQkZUAMRRNzERDumgI2Pr',
//     'run_1IOtj8RTGUmbwQiu8lSSqZDn'
// );
// console.log(run);

// const messages = await openai.beta.threads.messages.list(
//     'thread_auTuQkZUAMRRNzERDumgI2Pr'
// );

// messages.body.data.forEach((m) => {
//     console.log(m);
// });

// console.log(messages);
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
    authRoutes,
    aiRoutes
);
app.listen(port, () => console.log(`Server running on port ${port}`));

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

dotenv.config();

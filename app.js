import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import functionRoutes from './routes/functionRoutes.js';
import variableRoutes from './routes/variableRoutes.js';
import allTogetherRoutes from './routes/allTogetherRoutes.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in projectRoutes.js
app.use(
    '/namegacha/api',
    projectRoutes,
    pageRoutes,
    functionRoutes,
    variableRoutes,
    allTogetherRoutes
);

app.listen(port, () => console.log(`Server running on port ${port}`));

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

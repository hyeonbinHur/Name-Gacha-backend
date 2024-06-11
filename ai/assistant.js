/*
 * sample thread Id = 'thread_auTuQkZUAMRRNzERDumgI2Pr'
 * sample run Id = 'run_1IOtj8RTGUmbwQiu8lSSqZDn'
 * 1. create AI model
 * 2. create thread
 * 3. create message
 * 4. add message
 * 5. run assistant
 * 6. check status -> return message
 */

import { OpenAI } from 'openai';
import express from 'express';

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const assistant = await openai.beta.assistants.create({
    name: 'nameGacha AI',
    instructions:
        "Objective:You are required to generate nine possible names for a function or variable based on the description provided by the user. After generating these names, you will also provide a brief explanation (one or two sentences) describing the suitability or relevance of these names.Input from User: The user will provide:A brief description or definition of the function or variable.The desired naming convention (e.g., camelCase, PascalCase, snake_case).Output Requirements:Names: Suggest nine potential names that fit the user's description and specified naming convention.Explanation: Provide a general explanation (one sentence) that relates to all suggested names, explaining how they match the function or variable's purpose.",
    tools: [
        {
            type: 'code_interpreter',
        },
    ],
    model: 'gpt-4o',
});

let poolingInterval;

const createThread = async () => {
    const thread = await openai.beta.threads.create();
    return thread;
};

const addMessage = async (threadId, message) => {
    const response = await openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content: message,
    });
};

const runAI = async (threadId) => {
    const response = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistant.id,
    });
    return response;
};

const checkStatus = async (res, threadId, runId) => {
    const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);
    const status = runObject.status;
    if (status == 'completed') {
        clearInterval(poolingInterval);

        const messageList = await openai.beta.threads.messages.list(threadId);
        let messages = [];

        messageList.body.data.forEach((message) => {
            messages.push(message.content);
        });

        res.json({ messages });
    }
};

router.get('/thread', (req, res) => {
    createThread().then((thread) => {
        res.json({ threadId: thread.id });
    });
});

router.post('/message', (req, res) => {
    const { message, threadId } = req.body;
    addMessage(threadId, message).then((message) => {
        runAI(threadId).then((run) => {
            const runId = run.id;
            poolingInterval = setInterval(() => {
                checkStatus(res, threadId, runId);
            }, 5000);
        });
    });
});

export default router;

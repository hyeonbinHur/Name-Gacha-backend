import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const assistant_id = process.env.ASSISTANT_ID;

const addMessage = async (threadId, message) => {
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
};

const runAI = async (threadId) => {
  const response = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistant_id,
  });
  return response;
};

export default {
  addMessage,
  runAI,
  openai,
  assistant_id,
};

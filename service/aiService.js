import aiUtils from "../utils/aiUtils.js";

const createThread = async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    return { statusCode: 200, response: thread };
  } catch (error) {
    return { statusCode: 500, response: error };
  }
};

const readMessages = async (threadId) => {
  try {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 100000);
    });
    const messageList = await Promise.race([
      openai.beta.threads.messages.list(threadId),
      timeout,
    ]);
    let messages = [];
    messageList.body.data.forEach((message) => {
      messages.push(message.content);
    });
    return { statusCode: 200, response: messages };
  } catch (err) {
    const statusCode = err.message === "Request timed out" ? 408 : 404;
    return { statusCode, response: err.message };
  }
};

const checkStatus = async (threadId, runId) => {
  try {
    const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);
    const status = runObject.status;
    return { statusCode: 200, response: status };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const readReply = async (threadId) => {
  try {
    const messageList = await openai.beta.threads.messages.list(threadId);
    const messages = messageList.body.data;
    const lastMessage = messages[0].content;
    return { statusCode: 200, response: lastMessage };
  } catch (err) {
    return { statusCode: 500, response: err.message };
  }
};

const sendMessage = async (threadId, message) => {
  try {
    const addMessageResponse = await aiUtils.addMessage(threadId, message);
    const run = await aiUtils.runAI(threadId);
    return { statusCode: 200, response: run.id };
  } catch (error) {
    return { statusCode: 500, response: err.message };
  }
};

export default {
  createThread,
  readMessages,
  checkStatus,
  readReply,
  sendMessage,
};

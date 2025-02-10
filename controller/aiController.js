import aiService from "../service/aiService";

const create_thread = async (req, res) => {
  try {
    const { statusCode, response } = aiService.createThread;
    return res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_message = async (req, res) => {
  try {
    const { threadId } = req.body;
    const { statusCode, response } = aiService.readMessages(threadId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_status = async (req, res) => {
  try {
    const { threadId, runId } = req.body;
    const { statusCode, response } = aiService.checkStatus(threadId, runId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_reply = async (req, res) => {
  try {
    const { threadId } = req.body;
    const { statusCode, response } = aiService.readReply(threadId);
    res.status(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const send_message = async (req, res) => {
  try {
    const { threadId, message } = req.body;
    const { statusCode, response } = aiService.sendMessage(threadId, message);
    res.json(statusCode).json(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  create_thread,
  get_message,
  get_status,
  get_reply,
  send_message,
};

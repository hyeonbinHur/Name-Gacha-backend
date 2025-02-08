import express from "express";
import controller from "../controller/aiController.js";
const router = express.Router();
router.get("/ai/thread", controller.get_thread);
router.get("/ai/message", controller.get_message);
router.get("/ai/status", controller.get_status);
router.get("/ai/reply", controller.get_reply);
router.post("/ai", controller.send_message);
export default router;

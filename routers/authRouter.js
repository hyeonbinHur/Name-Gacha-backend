import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();
router.post("/auth/sign-in", controller.sign_in_user);
router.post("/auth/sign-out", controller.sign_out_user);
router.post("/auth/sign-up", controller.sign_up_user);

router.post("/auth/access-token", controller.check_access_token);
router.post("/auth/refresh-token", controller.check_refresh_token);

router.put("/auth", controller.update_user);
router.get("/auth", controller.get_user);
router.options("/auth", controller.optionHandler);

export default router;

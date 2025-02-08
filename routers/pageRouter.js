import express from "express";
import controller from "../controller/pageController.js";

const router = express.Router();
router.get("/page/:pageId", controller.get_page); // 페이지 하나 가져오기
router.get("/pages", controller.get_pages); // 페이지 여러개 불러오기
router.post("/page", controller.create_page); // 페이지 하나 생성
router.put("/page/:pageId", controller.update_page); // 페이지 하나 변경
router.delete("/page/:pageId", controller.delete_page); // 페이지 하나 삭제
export default router;

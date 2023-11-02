import express from "express";
import { ReviewsController } from "./review.controller";
const router = express.Router();
router.post("/", ReviewsController.insertIntoDB);
export const reviewRouter = router;

import express from "express";
import { BookingController } from "./booking.controller";
const router = express.Router();
router.post("/", BookingController.insertIntoDB);
export const bookingRouter = router;

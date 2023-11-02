import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
const router = express.Router();
router.post(
  "/",
  validateRequest(UserValidation.create),
  UserController.insertIntoDB
);
router.get("/allCustomer", UserController.getAllCustomer);
router.get("/getAllAdmin", UserController.getAdmin);
export const userRouter = router;

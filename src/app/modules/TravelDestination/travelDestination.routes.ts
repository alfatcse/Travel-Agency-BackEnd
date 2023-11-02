import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TravelDestinationsController } from "./travelDestination.controller";
import { TravelDestinationValidation } from "./travelDestination.validation";
const router = express.Router();
router.post(
  "/",
  validateRequest(TravelDestinationValidation.create),
  TravelDestinationsController.insertIntoDB
);
router.get("/", TravelDestinationsController.getAllTravelDestination);
export const TravelRouter = router;

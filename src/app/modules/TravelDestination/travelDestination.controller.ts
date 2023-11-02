import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { travelSearchableFields } from "./travelDestination.constants";
import { TravelDestinationService } from "./travelDestination.service";
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelDestinationService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Inserted Successfully",
    data: result,
  });
});
const getAllTravelDestination = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, travelSearchableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await TravelDestinationService.getAllTravelDestination(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Data Inserted Successfully",
      data: result,
    });
  }
);
export const TravelDestinationsController = {
  insertIntoDB,
  getAllTravelDestination,
};

import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewService } from "./review.service";
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Inserted Successfully",
    data: result,
  });
});
export const ReviewsController = {
  insertIntoDB,
};

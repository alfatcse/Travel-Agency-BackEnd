import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { userSearchableFields } from "./user.constants";
import { UserService } from "./user.service";
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Inserted Successfully",
    data: result,
  });
});
const getAllCustomer = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userSearchableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllCustomer(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Fetched Successfully",
    data: result.data,
    meta: result.meta,
  });
});
const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userSearchableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllAdmin(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Data Fetched Successfully",
    data: result.data,
    meta: result.meta,
  });
});
export const UserController = {
  insertIntoDB,
  getAllCustomer,
  getAdmin,
};

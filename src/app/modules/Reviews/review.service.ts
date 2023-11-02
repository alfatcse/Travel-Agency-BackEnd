import { Reviews } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IReviewData } from "./review.interface";

const insertIntoDB = async (data: IReviewData): Promise<Reviews> => {
  const result = await prisma.reviews.create({
    data,
  });
  return result;
};
export const ReviewService = {
  insertIntoDB,
};

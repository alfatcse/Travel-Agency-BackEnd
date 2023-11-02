import { Reviews } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IReviewData } from "./review.interface";

const insertIntoDB = async (data: IReviewData): Promise<Reviews> => {
  const result = await prisma.$transaction(async (prismaTransactionClient) => {
    const review = await prismaTransactionClient.reviews.create({
      data,
    });
    const AllReviews = await prismaTransactionClient.reviews.findMany({
      select: {
        Ratting: true,
      },
    });
    const totalRatting = AllReviews.reduce(
      (sum, review) => sum + review.Ratting,
      0
    );
    await prismaTransactionClient.travelDestinations.update({
      where: { id: data.TravelDestinationId },
      data: {
        ratting: totalRatting / AllReviews.length,
      },
    });
    return review;
  });
  return result;
};
export const ReviewService = {
  insertIntoDB,
};

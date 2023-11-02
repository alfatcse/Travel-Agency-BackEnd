import { Booking } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookingData } from "./booking.interface";
const insertIntoDB = async (
  data: IBookingData
): Promise<Partial<Booking> | string> => {
  const result = await prisma.$transaction(async (prismaTransactionClient) => {
    const availability =
      await prismaTransactionClient.travelDestinations.findUnique({
        where: {
          id: data.TravelDestinationId,
        },
      });
    if (!availability) {
      return "Travel destination not found";
    }
    if (availability?.seat - data.Number_Traveler < 0) {
      return "Have no enough seats";
    } else {
      if (availability?.seat - data.Number_Traveler === 0) {
        await prismaTransactionClient.travelDestinations.update({
          where: { id: data.TravelDestinationId },
          data: {
            seat: availability?.seat - data.Number_Traveler,
            Status: "Sold_Out",
          },
        });
      } else {
        await prismaTransactionClient.travelDestinations.update({
          where: { id: data.TravelDestinationId },
          data: {
            seat: availability?.seat - data.Number_Traveler,
          },
        });
      }
      const result = await prismaTransactionClient.booking.create({
        data,
        include: {
          User: true,
          TravelDestination: true,
        },
      });
      return result;
    }
  });

  return result;
};
export const BookingService = {
  insertIntoDB,
};

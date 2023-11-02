import { z } from "zod";

const create = z.object({
  body: z.object({
    UserId: z.string({
      required_error: "User Id is Required",
    }),
    TravelDestinationId: z.string({
      required_error: "Travel Destination Id is required",
    }),
    Number_Traveler: z.number({
      required_error: "Number of Traveler is Required",
    }),
  }),
});
export const BookingValidation = {
  create,
};

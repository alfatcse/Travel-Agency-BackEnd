import { z } from "zod";

const create = z.object({
  body: z.object({
    Ratting: z.number({
      required_error: "Ratting is Required",
    }),
    Comment: z.string({
      required_error: "Comment is required",
    }),
    UserId: z.string({
      required_error: "UserId is Required",
    }),
    TravelDestinationId: z.string({
      required_error: "TravelDestinationId is Required",
    }),
  }),
});
export const ReviewValidation = {
  create,
};

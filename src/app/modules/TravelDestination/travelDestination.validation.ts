import { z } from "zod";

const create = z.object({
  body: z.object({
    image: z.string().optional(),
    time: z.string({
      required_error: "Travel Time is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    destination: z.string({
      required_error: "Destination is Required",
    }),
    title: z.string({
      required_error: "Tile is Required",
    }),
    adminId: z.string({
      required_error: "Admin Id is required",
    }),
    seat: z.number({
      required_error: "Number of seat is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});
export const TravelDestinationValidation = {
  create,
};

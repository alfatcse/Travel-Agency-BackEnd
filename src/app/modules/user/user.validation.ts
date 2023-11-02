import { z } from "zod";
import { UserType } from "./user.constants";

const create = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is Required",
    }),
    profileImage: z.string({
      required_error: "Profile Image is Required",
    }),
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email(),
    name: z.string({ required_error: "Name is Required" }),
    userType: z.enum([...UserType] as [string, ...string[]]).optional(),
  }),
});
export const UserValidation = {
  create,
};

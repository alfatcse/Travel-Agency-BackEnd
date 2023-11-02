import { UserType } from "@prisma/client";

export type IUserData = {
  password: string;
  profileImage: string;
  email: string;
  name: string;
  contactNo: string;
  userType?: UserType;
};
export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
};

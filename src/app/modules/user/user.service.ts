import { User, UserType } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../../shared/utils";
import { IUserData } from "./user.interface";

const createUser = async (data: IUserData): Promise<Partial<User>> => {
  data.password = await hashPassword(data?.password);
  const UserData = {
    email: data?.email,
    name: data?.name,
    contactNo: data?.contactNo,
  };
  const result = await prisma.$transaction(async (prismaTransactionClient) => {
    if (data?.userType === "admin") {
      const createAdmin = await prismaTransactionClient.admin.create({
        data: UserData,
      });
      const createUser = {
        adminId: createAdmin.id,
        password: data?.password,
        profileImage: data?.profileImage,
        userType: UserType.admin,
      };
      const result = await prismaTransactionClient.user.create({
        data: createUser,
        select: {
          id: true,
          profileImage: true,
          userType: true,
          createdAt: true,
          updatedAt: true,
          adminId: true,
          Admin: true,
        },
      });
      return result;
    } else {
      const createCustomer = await prismaTransactionClient.customer.create({
        data: UserData,
      });
      const createUser = {
        customerId: createCustomer.id,
        password: data?.password,
        profileImage: data?.profileImage,
        userType: UserType.customer,
      };
      const result = await prismaTransactionClient.user.create({
        data: createUser,
        select: {
          id: true,
          profileImage: true,
          userType: true,
          createdAt: true,
          updatedAt: true,
          customerId: true,
          Customer: true,
        },
      });
      return result;
    }
  });
  return result;
};
export const UserService = {
  createUser,
};

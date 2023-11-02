import { Admin, Customer, Prisma, User, UserType } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../../shared/utils";
import {
  userRelationalFields,
  userRelationalFieldsMapper,
  userSearchableFields,
} from "./user.constants";
import { IUserData, IUserFilterRequest } from "./user.interface";
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
const getAllCustomer = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<Customer[]>>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (userRelationalFields.includes(key)) {
          return {
            [userRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.CustomerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.customer.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.customer.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getAllAdmin = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<Admin[]>>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (userRelationalFields.includes(key)) {
          return {
            [userRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
export const UserService = {
  createUser,
  getAllCustomer,
  getAllAdmin,
};

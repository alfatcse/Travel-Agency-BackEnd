import { Prisma, TravelDestinations } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import {
  travelRelationalFields,
  travelRelationalFieldsMapper,
  travelSearchableFields,
} from "./travelDestination.constants";
import {
  ITravelDestination,
  ITravelFilterRequest,
} from "./travelDestination.interface";
const insertIntoDB = async (
  data: ITravelDestination
): Promise<TravelDestinations> => {
  const result = await prisma.travelDestinations.create({
    data,
    include: {
      Admin: true,
    },
  });
  return result;
};
const getAllTravelDestination = async (
  filters: ITravelFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<TravelDestinations[]>>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: travelSearchableFields.map((field) => ({
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
        if (travelRelationalFields.includes(key)) {
          return {
            [travelRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.TravelDestinationsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.travelDestinations.findMany({
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
  const total = await prisma.travelDestinations.count({
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
export const TravelDestinationService = {
  insertIntoDB,
  getAllTravelDestination,
};

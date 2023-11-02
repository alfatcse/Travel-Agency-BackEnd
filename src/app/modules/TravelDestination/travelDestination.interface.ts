import { CurrentStatus } from "@prisma/client";

export type ITravelDestination = {
  image: string;
  time: string;
  price: number;
  destination: string;
  title: string;
  ratting?: number;
  Status?: CurrentStatus;
  adminId: string;
  seat: number;
  description: string;
};

export type ITravelFilterRequest = {
  searchTerm?: string | undefined;
  destination?: string | undefined;
  Status?: string | undefined;
};

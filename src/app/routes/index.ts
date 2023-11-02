import express from "express";
import { TravelRouter } from "../modules/TravelDestination/travelDestination.routes";
import { userRouter } from "../modules/user/user.routes";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/travel-destination",
    route: TravelRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

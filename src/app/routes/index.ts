import express from "express";
import { bookingRouter } from "../modules/Booking/booking.routes";
import { reviewRouter } from "../modules/Reviews/review.routes";
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
  {
    path: "/booking",
    route: bookingRouter,
  },
  {
    path: "/review",
    route: reviewRouter,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

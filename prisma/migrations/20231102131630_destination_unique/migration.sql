/*
  Warnings:

  - A unique constraint covering the columns `[time]` on the table `TravelDestinations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination]` on the table `TravelDestinations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TravelDestinations_time_key" ON "TravelDestinations"("time");

-- CreateIndex
CREATE UNIQUE INDEX "TravelDestinations_destination_key" ON "TravelDestinations"("destination");

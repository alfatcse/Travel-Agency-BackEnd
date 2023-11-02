-- CreateEnum
CREATE TYPE "CurrentStatus" AS ENUM ('Available', 'Sold_Out');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Booked', 'Confirmed', 'Rejected', 'Canceled');

-- CreateTable
CREATE TABLE "TravelDestinations" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ratting" INTEGER NOT NULL DEFAULT 0,
    "Status" "CurrentStatus" NOT NULL DEFAULT 'Available',
    "adminId" TEXT NOT NULL,
    "seat" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelDestinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "TravelDestinationId" TEXT NOT NULL,
    "Number_Traveler" INTEGER NOT NULL,
    "BookingStatus" "BookingStatus" NOT NULL DEFAULT 'Booked',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "Ratting" INTEGER NOT NULL,
    "Comment" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "TravelDestinationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TravelDestinations" ADD CONSTRAINT "TravelDestinations_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_TravelDestinationId_fkey" FOREIGN KEY ("TravelDestinationId") REFERENCES "TravelDestinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_TravelDestinationId_fkey" FOREIGN KEY ("TravelDestinationId") REFERENCES "TravelDestinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

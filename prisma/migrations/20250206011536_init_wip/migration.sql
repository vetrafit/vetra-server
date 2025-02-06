-- CreateEnum
CREATE TYPE "GymStatus" AS ENUM ('PENDING', 'APPROVED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "GymRole" AS ENUM ('ADMIN', 'COACH', 'CLIENT');

-- CreateEnum
CREATE TYPE "GymUserStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'TERMINATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "superAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gym" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "status" "GymStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,
    "role" "GymRole" NOT NULL DEFAULT 'CLIENT',
    "status" "GymUserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Gym_name_key" ON "Gym"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GymUser_userId_gymId_key" ON "GymUser"("userId", "gymId");

-- AddForeignKey
ALTER TABLE "GymUser" ADD CONSTRAINT "GymUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymUser" ADD CONSTRAINT "GymUser_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

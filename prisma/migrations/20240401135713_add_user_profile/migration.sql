/*
  Warnings:

  - You are about to drop the column `faculty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "faculty",
DROP COLUMN "major",
DROP COLUMN "program";

-- CreateTable
CREATE TABLE "UserProfile" (
    "npm" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("npm")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_user_id_key" ON "UserProfile"("user_id");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

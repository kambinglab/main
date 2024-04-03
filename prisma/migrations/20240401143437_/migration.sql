/*
  Warnings:

  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[npm,program]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_npm_program_key" ON "UserProfile"("npm", "program");

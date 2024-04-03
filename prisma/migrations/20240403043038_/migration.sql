/*
  Warnings:

  - You are about to drop the column `content_html` on the `Accusation` table. All the data in the column will be lost.
  - You are about to drop the column `content_text` on the `Accusation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Accusation` table. All the data in the column will be lost.
  - You are about to drop the column `content_html` on the `AccusationResponse` table. All the data in the column will be lost.
  - You are about to drop the column `content_text` on the `AccusationResponse` table. All the data in the column will be lost.
  - Added the required column `content` to the `Accusation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `AccusationResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accusation" DROP COLUMN "content_html",
DROP COLUMN "content_text",
DROP COLUMN "title",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AccusationResponse" DROP COLUMN "content_html",
DROP COLUMN "content_text",
ADD COLUMN     "content" TEXT NOT NULL;

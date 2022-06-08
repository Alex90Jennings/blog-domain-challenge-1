/*
  Warnings:

  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(280)`.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "picture" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(150) NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(280);

/*
  Warnings:

  - You are about to drop the column `isConsec` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "isConsec",
ADD COLUMN     "is_ConsecRoom" BOOLEAN NOT NULL DEFAULT false;

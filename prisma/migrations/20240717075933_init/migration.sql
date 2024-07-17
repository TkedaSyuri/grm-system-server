/*
  Warnings:

  - A unique constraint covering the columns `[floorNumber]` on the table `Floor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_floorId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Floor_floorNumber_key" ON "Floor"("floorNumber");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("floorNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `created_at` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `is_ConsecRoom` on the `Room` table. All the data in the column will be lost.
  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staff_id` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `staff_name` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Task` table. All the data in the column will be lost.
  - Added the required column `staffName` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "is_ConsecRoom",
ADD COLUMN     "isConsecutiveNight" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "roomState" SET DEFAULT 'vacant';

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
DROP COLUMN "staff_id",
DROP COLUMN "staff_name",
ADD COLUMN     "staffId" SERIAL NOT NULL,
ADD COLUMN     "staffName" TEXT NOT NULL,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("staffId");

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "is_completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

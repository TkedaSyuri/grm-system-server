-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "floorNumber" INTEGER NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "roomState" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

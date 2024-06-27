-- CreateTable
CREATE TABLE "Floor2" (
    "id" SERIAL NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "roomState" TEXT NOT NULL,

    CONSTRAINT "Floor2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor3" (
    "id" SERIAL NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "roomState" TEXT NOT NULL,

    CONSTRAINT "Floor3_pkey" PRIMARY KEY ("id")
);

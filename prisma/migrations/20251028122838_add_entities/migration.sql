/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CartridgeStatus" AS ENUM ('SERVICE', 'WORKING', 'RESERVE', 'AVAILABLE', 'REFILL');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'PARTIAL_RETURN');

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "public"."Session";

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cartridge" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "numericNumber" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "status" "CartridgeStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Cartridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Printer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Replacement" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "departamentId" INTEGER NOT NULL,
    "installedCartridgeNumber" TEXT,
    "removedCartridgeNumber" TEXT,
    "responsible" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Replacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBatch" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "BatchStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "partialReturnDate" TEXT,

    CONSTRAINT "ServiceBatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBatchCartridge" (
    "id" TEXT NOT NULL,
    "cartridgeId" INTEGER NOT NULL,
    "serviceBatchId" TEXT NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "returnDate" TEXT,
    "returnResponsible" TEXT,
    "returnNotes" TEXT,

    CONSTRAINT "ServiceBatchCartridge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModelToPrinter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ModelToPrinter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Model_model_key" ON "Model"("model");

-- CreateIndex
CREATE UNIQUE INDEX "Cartridge_number_key" ON "Cartridge"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceBatchCartridge_cartridgeId_serviceBatchId_key" ON "ServiceBatchCartridge"("cartridgeId", "serviceBatchId");

-- CreateIndex
CREATE INDEX "_ModelToPrinter_B_index" ON "_ModelToPrinter"("B");

-- AddForeignKey
ALTER TABLE "Cartridge" ADD CONSTRAINT "Cartridge_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD CONSTRAINT "Replacement_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD CONSTRAINT "Replacement_installedCartridgeNumber_fkey" FOREIGN KEY ("installedCartridgeNumber") REFERENCES "Cartridge"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD CONSTRAINT "Replacement_removedCartridgeNumber_fkey" FOREIGN KEY ("removedCartridgeNumber") REFERENCES "Cartridge"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBatchCartridge" ADD CONSTRAINT "ServiceBatchCartridge_cartridgeId_fkey" FOREIGN KEY ("cartridgeId") REFERENCES "Cartridge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBatchCartridge" ADD CONSTRAINT "ServiceBatchCartridge_serviceBatchId_fkey" FOREIGN KEY ("serviceBatchId") REFERENCES "ServiceBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelToPrinter" ADD CONSTRAINT "_ModelToPrinter_A_fkey" FOREIGN KEY ("A") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelToPrinter" ADD CONSTRAINT "_ModelToPrinter_B_fkey" FOREIGN KEY ("B") REFERENCES "Printer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

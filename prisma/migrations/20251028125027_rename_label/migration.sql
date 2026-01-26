/*
  Warnings:

  - You are about to drop the column `number` on the `Cartridge` table. All the data in the column will be lost.
  - You are about to drop the column `numericNumber` on the `Cartridge` table. All the data in the column will be lost.
  - You are about to drop the column `installedCartridgeNumber` on the `Replacement` table. All the data in the column will be lost.
  - You are about to drop the column `removedCartridgeNumber` on the `Replacement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `Cartridge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Cartridge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numericLabel` to the `Cartridge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Replacement" DROP CONSTRAINT "Replacement_installedCartridgeNumber_fkey";

-- DropForeignKey
ALTER TABLE "public"."Replacement" DROP CONSTRAINT "Replacement_removedCartridgeNumber_fkey";

-- DropIndex
DROP INDEX "public"."Cartridge_number_key";

-- AlterTable
ALTER TABLE "Cartridge" DROP COLUMN "number",
DROP COLUMN "numericNumber",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "numericLabel" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Replacement" DROP COLUMN "installedCartridgeNumber",
DROP COLUMN "removedCartridgeNumber",
ADD COLUMN     "installedCartridgeLabel" TEXT,
ADD COLUMN     "removedCartridgeLabel" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cartridge_label_key" ON "Cartridge"("label");

-- AddForeignKey
ALTER TABLE "Replacement" ADD CONSTRAINT "Replacement_installedCartridgeLabel_fkey" FOREIGN KEY ("installedCartridgeLabel") REFERENCES "Cartridge"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replacement" ADD CONSTRAINT "Replacement_removedCartridgeLabel_fkey" FOREIGN KEY ("removedCartridgeLabel") REFERENCES "Cartridge"("label") ON DELETE SET NULL ON UPDATE CASCADE;

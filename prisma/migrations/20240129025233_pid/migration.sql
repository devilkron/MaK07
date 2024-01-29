/*
  Warnings:

  - You are about to drop the column `promotion_id` on the `Product_Img` table. All the data in the column will be lost.
  - Added the required column `promotionId` to the `Product_promotion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product_Img` DROP FOREIGN KEY `Product_Img_promotion_id_fkey`;

-- AlterTable
ALTER TABLE `Product_Img` DROP COLUMN `promotion_id`;

-- AlterTable
ALTER TABLE `Product_promotion` ADD COLUMN `promotionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product_promotion` ADD CONSTRAINT `Product_promotion_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

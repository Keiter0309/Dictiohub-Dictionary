/*
  Warnings:

  - Added the required column `wordName` to the `FavoriteWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favoriteword` ADD COLUMN `wordName` VARCHAR(191) NOT NULL;

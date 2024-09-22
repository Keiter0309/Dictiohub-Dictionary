/*
  Warnings:

  - Added the required column `partOfSpeech` to the `Definition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `WordCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `definition` ADD COLUMN `partOfSpeech` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wordcategory` ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

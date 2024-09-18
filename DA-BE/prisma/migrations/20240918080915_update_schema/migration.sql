/*
  Warnings:

  - Added the required column `definition` to the `Words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `example` to the `Words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partOfSpeech` to the `Words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronunciation` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `words` ADD COLUMN `definition` VARCHAR(191) NOT NULL,
    ADD COLUMN `example` VARCHAR(191) NOT NULL,
    ADD COLUMN `partOfSpeech` VARCHAR(191) NOT NULL,
    ADD COLUMN `pronunciation` VARCHAR(191) NOT NULL;

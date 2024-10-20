/*
  Warnings:

  - Added the required column `definitionId` to the `PartOfSpeech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partofspeech` ADD COLUMN `definitionId` INTEGER NOT NULL;

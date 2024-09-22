/*
  Warnings:

  - You are about to drop the column `definition` on the `word` table. All the data in the column will be lost.
  - You are about to drop the column `example` on the `word` table. All the data in the column will be lost.
  - You are about to drop the column `meaning` on the `word` table. All the data in the column will be lost.
  - You are about to drop the column `partOfSpeech` on the `word` table. All the data in the column will be lost.
  - You are about to drop the column `pronunciation` on the `word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `word` DROP COLUMN `definition`,
    DROP COLUMN `example`,
    DROP COLUMN `meaning`,
    DROP COLUMN `partOfSpeech`,
    DROP COLUMN `pronunciation`;

-- CreateTable
CREATE TABLE `Meaning` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `meaningText` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Meaning` ADD CONSTRAINT `Meaning_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `lastLoginIP` VARCHAR(191) NULL,
    ADD COLUMN `wordAdded` INTEGER NULL;

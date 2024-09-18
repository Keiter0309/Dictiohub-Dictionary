/*
  Warnings:

  - You are about to alter the column `wordId` on the `examplewords` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `word_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wordcategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examplewords` MODIFY `wordId` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pronunciations` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `words` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `tags`;

-- DropTable
DROP TABLE `word_tags`;

-- DropTable
DROP TABLE `wordcategories`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Words` ADD CONSTRAINT `Words_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExampleWords` ADD CONSTRAINT `ExampleWords_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Words`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pronunciations` ADD CONSTRAINT `Pronunciations_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Words`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

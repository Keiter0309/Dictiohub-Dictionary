/*
  Warnings:

  - You are about to drop the column `userId` on the `words` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Words_userId_fkey` ON `words`;

-- AlterTable
ALTER TABLE `words` DROP COLUMN `userId`;

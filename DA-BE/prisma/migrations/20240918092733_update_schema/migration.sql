/*
  Warnings:

  - A unique constraint covering the columns `[word]` on the table `Words` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Words_word_key` ON `Words`(`word`);

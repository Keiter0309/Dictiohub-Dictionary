-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    UNIQUE INDEX `Category_categoryName_key`(`categoryName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Definition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `posId` INTEGER NOT NULL,
    `partOfSpeech` VARCHAR(191) NOT NULL,
    `definitionText` VARCHAR(191) NOT NULL,
    `usageExample` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    INDEX `Definition_posId_fkey`(`posId`),
    INDEX `Definition_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExampleWord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `exampleText` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    INDEX `ExampleWord_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteWord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FavoriteWord_userId_fkey`(`userId`),
    INDEX `FavoriteWord_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

    INDEX `Meaning_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PartOfSpeech` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `definitionId` INTEGER NULL,
    `partOfSpeech` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PartOfSpeech_partOfSpeech_key`(`partOfSpeech`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pronunciation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `audioPath` VARCHAR(191) NOT NULL,
    `dialect` VARCHAR(191) NOT NULL,
    `ipaText` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    INDEX `Pronunciation_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SynonymsAntonyms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `synonyms` VARCHAR(191) NOT NULL,
    `antonyms` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    INDEX `SynonymsAntonyms_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `confirmPassword` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `role` VARCHAR(191) NOT NULL,
    `updatedBy` INTEGER NULL,
    `resetPasswordOTP` VARCHAR(191) NULL,
    `resetPasswordExpires` DATETIME(3) NULL,
    `lastLogin` DATETIME(3) NULL,
    `lastLoginIP` VARCHAR(191) NULL,
    `wordAdded` INTEGER NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSearchHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `searchTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `UserSearchHistory_userId_fkey`(`userId`),
    INDEX `UserSearchHistory_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Word` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `word` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `deletedBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,

    UNIQUE INDEX `Word_word_key`(`word`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WordCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wordId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,

    INDEX `WordCategory_categoryId_fkey`(`categoryId`),
    INDEX `WordCategory_wordId_fkey`(`wordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Definition` ADD CONSTRAINT `Definition_posId_fkey` FOREIGN KEY (`posId`) REFERENCES `PartOfSpeech`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Definition` ADD CONSTRAINT `Definition_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExampleWord` ADD CONSTRAINT `ExampleWord_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteWord` ADD CONSTRAINT `FavoriteWord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteWord` ADD CONSTRAINT `FavoriteWord_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meaning` ADD CONSTRAINT `Meaning_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pronunciation` ADD CONSTRAINT `Pronunciation_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SynonymsAntonyms` ADD CONSTRAINT `SynonymsAntonyms_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchHistory` ADD CONSTRAINT `UserSearchHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSearchHistory` ADD CONSTRAINT `UserSearchHistory_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordCategory` ADD CONSTRAINT `WordCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WordCategory` ADD CONSTRAINT `WordCategory_wordId_fkey` FOREIGN KEY (`wordId`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

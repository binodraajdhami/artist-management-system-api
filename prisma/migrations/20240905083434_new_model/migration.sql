-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(500) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `dob` DATETIME(3) NULL,
    `gender` ENUM('M', 'F', 'O') NOT NULL DEFAULT 'M',
    `role` ENUM('SUPER_ADMIN', 'ARTIST_MANAGER', 'ARTIST') NOT NULL DEFAULT 'ARTIST',
    `address` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `dob` DATETIME(3) NULL,
    `gender` ENUM('M', 'F', 'O') NOT NULL DEFAULT 'M',
    `address` VARCHAR(255) NOT NULL,
    `first_release_year` DATETIME(3) NULL,
    `no_of_albums_release` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Music` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `album_name` VARCHAR(255) NOT NULL,
    `genre` ENUM('RNB', 'COUNTRY', 'CLASSIC', 'ROCK', 'JAZZ') NOT NULL DEFAULT 'CLASSIC',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `artist_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Music` ADD CONSTRAINT `Music_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

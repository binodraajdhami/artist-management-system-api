/*
  Warnings:

  - You are about to drop the column `user_id` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `artist_id` on the `music` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `Artist_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `music` DROP FOREIGN KEY `Music_artist_id_fkey`;

-- AlterTable
ALTER TABLE `artist` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `music` DROP COLUMN `artist_id`,
    ADD COLUMN `artistId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Music` ADD CONSTRAINT `Music_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

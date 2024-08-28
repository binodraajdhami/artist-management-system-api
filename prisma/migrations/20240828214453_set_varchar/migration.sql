-- AlterTable
ALTER TABLE `artist` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `music` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `album_name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `first_name` VARCHAR(255) NOT NULL,
    MODIFY `last_name` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(500) NOT NULL,
    MODIFY `phone` VARCHAR(20) NOT NULL,
    MODIFY `address` VARCHAR(255) NOT NULL;

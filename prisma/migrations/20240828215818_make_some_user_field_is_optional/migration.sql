-- AlterTable
ALTER TABLE `user` MODIFY `last_name` VARCHAR(255) NULL,
    MODIFY `phone` VARCHAR(20) NULL,
    MODIFY `dob` DATETIME(3) NULL,
    MODIFY `address` VARCHAR(255) NULL;

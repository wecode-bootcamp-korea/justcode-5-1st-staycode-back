-- CreateTable
CREATE TABLE `accomodation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `stay_type` VARCHAR(50) NOT NULL,
    `theme` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accomodation_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accomodation_id` INTEGER NULL,
    `image_url` VARCHAR(300) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    INDEX `accomodation_id`(`accomodation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accomodation_id` INTEGER NULL,
    `title` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `event_detail_image_url` VARCHAR(300) NULL,
    `event_start` TIMESTAMP(0) NOT NULL,
    `event_end` TIMESTAMP(0) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `accomodation_id`(`accomodation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `features` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accomodation_id` INTEGER NULL,
    `title` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `pro_detail_image_url` VARCHAR(300) NULL,
    `pro_start` TIMESTAMP(0) NOT NULL,
    `pro_end` TIMESTAMP(0) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `accomodation_id`(`accomodation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `reservation_start` TIMESTAMP(0) NOT NULL,
    `reservation_end` TIMESTAMP(0) NOT NULL,
    `price` INTEGER NOT NULL,
    `guest` INTEGER NOT NULL,
    `special_requests` VARCHAR(200) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `room_id`(`room_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accomodation_id` INTEGER NULL,
    `name` VARCHAR(50) NOT NULL,
    `content` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `max_guest` INTEGER NOT NULL,
    `size` FLOAT NULL,
    `check_in_time` VARCHAR(50) NOT NULL,
    `check_out_time` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `accomodation_id`(`accomodation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NULL,
    `image_url` VARCHAR(300) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),

    INDEX `room_id`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT (now()),
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accomodation_images` ADD CONSTRAINT `accomodation_images_ibfk_1` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `amenities` ADD CONSTRAINT `amenities_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `features` ADD CONSTRAINT `features_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `promotion` ADD CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `room_images` ADD CONSTRAINT `room_images_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

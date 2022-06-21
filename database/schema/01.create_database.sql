CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(50) UNIQUE,
  `name` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `accomodation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `stay_type` varchar(50) NOT NULL,
  `theme` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `accomodation_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `accomodation_id` int,
  `image_url` varchar(300) NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `promotion` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `accomodation_id` int,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `pro_detail_image_url` varchar(300),
  `pro_start` timestamp NOT NULL,
  `pro_end` timestamp NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `event` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `accomodation_id` int,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `event_detail_image_url` varchar(300),
  `event_start` timestamp NOT NULL,
  `event_end` timestamp NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `room` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `accomodation_id` int,
  `name` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `price` int NOT NULL,
  `max_guest` int NOT NULL,
  `size` float,
  `check_in_time` varchar(50) NOT NULL,
  `check_out_time` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `features` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `amenities` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

CREATE TABLE `room_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `image_url` varchar(300) NOT NULL,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `reservation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `room_id` int,
  `user_id` int,
  `reservation_start` timestamp NOT NULL,
  `reservation_end` timestamp NOT NULL,
  `price` int NOT NULL,
  `guest` int NOT NULL,
  `special_requests` varchar(200),
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp
);

ALTER TABLE `accomodation_images` ADD FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation` (`id`) on DELETE CASCADE;

ALTER TABLE `room` ADD FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation` (`id`) on DELETE CASCADE;

ALTER TABLE `room_images` ADD FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) on DELETE CASCADE;

ALTER TABLE `reservation` ADD FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) on DELETE CASCADE;

ALTER TABLE `reservation` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) on DELETE CASCADE;

ALTER TABLE `event` ADD FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation` (`id`) on DELETE CASCADE;

ALTER TABLE `features` ADD FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) on DELETE CASCADE;

ALTER TABLE `amenities` ADD FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) on DELETE CASCADE;

ALTER TABLE `promotion` ADD FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation` (`id`) on DELETE CASCADE;

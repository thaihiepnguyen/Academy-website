-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 24, 2022 at 08:09 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1
DROP DATABASE IF EXISTS `academy-db`;

CREATE DATABASE `academy-db`;
USE `academy-db`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'IT & Software'),
(2, 'Design'),
(3, 'Marketing'),
(4, 'Photography & Video');


CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `tiny_des` varchar(1023) DEFAULT NULL,
  `full_des` text,
  `price` bigint(20) DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL,
  `last_modify` varchar(100) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `lecture_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `levelCourse` varchar(255) DEFAULT NULL,
  `durationCourse` int DEFAULT 0,
  `weeklyHours` int DEFAULT 0,
  `enrolled` int DEFAULT 0,
  `discount` int DEFAULT 0,
  `requirements` text DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `includedItem` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 


INSERT INTO `courses` (`id`, `name`, `thumbnail`, `tiny_des`, `full_des`, `price`, `promotion_id`, `last_modify`, `status`, `category_id`, `lecture_id`, `rating`, `levelCourse`, `durationCourse`, `weeklyHours`, `enrolled`, `discount`, `requirements`, `overview`, `includedItem`) VALUES
(1, 'Python Website Full Tutorial', NULL, 'Flask, Authentication, Databases & More', 'Learn the PHP programming language in this full course / tutorial. The course is designed for new programmers, and will introduce common programming topics using the PHP language.', 489000, NULL, NULL, 1, 1, 9, 4,"",0,0,0,0,"","",""),
(2, 'What To Learn To Become a Python Backend Developer', NULL, 'Python Backend Developer', NULL, 500000, NULL, NULL, 1, 1, 9, 5,"",0,0,0,0,"","",""),
(3, 'The Ultimate Self-Taught Developer Curriculum', NULL, 'Developer Curriculum', NULL, 600000, NULL, NULL, 1, 1, 9, 4,"",0,0,0,0,"","",""),
(4, 'Full Stack Web Development for Beginners', NULL, 'Full Course on HTML, CSS, JavaScript, Node.js, MongoDB', NULL, 1000000, NULL, NULL, 1, 1, 10, 5,"",0,0,0,0,"","",""),
(5, 'React State Management', NULL, 'Intermediate JavaScript Course', NULL, 750000, NULL, NULL, 1, 1, 10, 4,"",0,0,0,0,"","",""),
(6, 'Unity 3D for dummies', 'https://media.sketchfab.com/models/3f49271eb0dc404e87333baebca59886/thumbnails/914bdb37755946e8813325f9592bb0da/c09eace2ef6942268f325c369b1043e3.jpeg', 'You want to create your own game but dont know where to begin your journey?\nThis is the course for you!', NULL, 750000, NULL, NULL, 1, 1, 10, 4,"Beginner",1,3,12987,0,"_Basic knowledge about computer \n_Have good internet connection","_In this course you will learn: \n+Basic programming using C#, +Popular tools in Unity 3D \n+Making 3 simple games with concept: 3d racing game, 2d action game and a top down rpg","_20 hours on-demand video \n_2 articles \n_10 quizzes \n_Full lifetime access all resources in this course"),
(7, 'Autodesk Fusion 360 Tutorial for Beginners', NULL, 'Learn the basics of designing', NULL, 650000, NULL, NULL, 1, 2, 10, 4,"",0,0,0,0,"","",""),
(8, 'Figma Tutorial for UI Design', NULL, 'In this Figma course, you will learn how to use Figma for UI Design', NULL, 750000, NULL, NULL, 1, 2, 10, 4,"",0,0,0,0,"","",""),
(9, 'Photoshop for Beginners', NULL, 'Go from beginner to pro in 23 lessons', NULL, 900000, NULL, NULL, 1, 2, 10, 4,"",0,0,0,0,"","",""),
(10, 'How To Use Canva For BEGINNERS! (Canva Tutorial 2020)', NULL, 'In this Canva tutorial video, I''ll be covering all of Canva', NULL, 850000, NULL, NULL, 1, 2, 10, 5,"",0,0,0,0,"","","");


CREATE TABLE `links` (
  `user_id` int(11) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `promotion` (`id`, `name`, `start_date`, `end_date`) VALUES
(1, 'Discount 10%', '2022-12-13', '2022-12-28');


CREATE TABLE `registered_courses` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `registered_courses` (`user_id`, `course_id`) VALUES
(17, 1),
(17, 4);


CREATE TABLE `review` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `comment` varchar(2000) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Học viên'),
(2, 'Giảng viên'),
(3, 'Quản trị viên');


CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` json NOT NULL,
  `expired` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `sessions` (`sid`, `sess`, `expired`) VALUES
('-fQ7iEH79jRwmI0aL3ajXLIuPTcYJSl7', '{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": {\"id\": 17, \"email\": \"testuser@gmail.com\", \"image\": \"/imgs/avt/17.jpg\", \"role_id\": 1, \"lastname\": \"user\", \"password\": \"$2b$10$LJsoeU/0cOBPSavh3JoFveW4QBQlIWoCX5WsNsQTFQ4uL7lhbcR3G\", \"firstname\": \"test\"}}', '2022-12-25 05:32:03'),
('-KAHvi1J2YifAxilQdjJC2b3uiCNRdEc', '{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": {\"id\": 17, \"email\": \"testuser@gmail.com\", \"image\": \"/imgs/avt/17.jpg\", \"role_id\": 1, \"lastname\": \"user\", \"password\": \"$2b$10$LJsoeU/0cOBPSavh3JoFveW4QBQlIWoCX5WsNsQTFQ4uL7lhbcR3G\", \"firstname\": \"test\"}}', '2022-12-24 16:20:59'),
('7xvkRW4UwtJLqLaRiG7GyZPGfUY2D4j6', '{\"auth\": false, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"authUser\": null}', '2022-12-25 04:52:13'),
('NfVKMPNBhINqmGL29EJ4fuj4-xHjSFgy', '{\"auth\": false, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/2\", \"authUser\": null}', '2022-12-25 08:07:54'),
('NtOSqQZ8dKAPkkMh9f0BEf7jJK83MOQg', '{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"authUser\": {\"id\": 17, \"email\": \"testuser@gmail.com\", \"image\": \"/imgs/avt/17.jpg\", \"role_id\": 1, \"lastname\": \"user\", \"password\": \"$2b$10$LJsoeU/0cOBPSavh3JoFveW4QBQlIWoCX5WsNsQTFQ4uL7lhbcR3G\", \"firstname\": \"test\"}}', '2022-12-24 08:18:53');


CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `field_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `topics` (`id`, `name`, `field_id`) VALUES
(1, 'Web Development', 1),
(2, 'Mobile Development', 1),
(3, 'Web Design', 2),
(4, 'Game Design', 2),
(5, 'Digital Marketing', 3),
(6, 'Product Marketing', 3),
(7, 'Digital Photography', 4),
(8, 'Video Design', 4);


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `image`, `role_id`) VALUES
(1, 'maddogmichel@chavezschool.org', 'qwert123', 'maddog', 'michel', 'public/images/avt/1.png', 1),
(2, 'ash33349599@gmail.com', '123456789h', 'ashley', 'sensor', 'public/images/avt/2.png', 1),
(3, 'fatal0g1c@gmail.com', '0987654321j', 'fatal', 'shit', 'public/images/avt/3.png', 1),
(4, 'allfit34541234@pickuplanet.com', 'mot23456789', 'allfit', 'prise', 'public/images/avt/4.png', 3),
(5, 'surjiksenya@elitemotions.com', 'reallystrongpwd', 'surjik', 'senya', 'public/images/avt/5.png', 2),
(6, 'korneevvitalick@imaanpharmacy.com', '1234thisispwd', 'vitalick', 'kornee', 'public/images/avt/7.png', 2),
(7, 'nguyenvannam@gmail.com', 'namkhongdeptrai', 'nam', 'nguyen', 'public/images/avt/8.png', 2),
(8, 'thaihiep232002@gmail.com', '1234567', 'thaihiep', 'nguyen', NULL, 1),
(9, 'techwithtim@gmail.com', 'techtim', 'Tim', 'Tech', NULL, 2),
(10, 'freecodecamp@gmail.com', 'codecampfree', 'free', 'campcode', NULL, 2),
(11, 'thaihiep@gmail.com', '1234567', 'thai', 'hiep', NULL, 1),
(12, 'quangbinh@gmail.com', '$2a$10$ey5e1r3lrtn41kKfd5Q5FuB5s.uQGmym3ei2oLKfn3MtqbC1GlxEa', 'binh', 'quang', NULL, 1),
(13, 'user@gmail.com', '$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.', 'user', 'test', NULL, 1),
(14, 'thaihiepnguyen@gmail.com', '$2a$10$.ESoYDK1/FEFQ9mzejXxbOUZoUiFHkpt/nWDgnThKepb2g0z/PZIG', 'thaihiep', 'nguyen', NULL, 1),
(15, 'thaihiepp@gmail.com', '$2a$10$h35zayIz/gvBcsCCsA5egO6tqSDvH7MC.Ih7hNxygSqbnDQgmRMGa', 'hiep', 'thai', NULL, 1),
(16, 'qwert@gmail.com', '$2a$10$oTNEtd2OANUI1zxOz7yWeu7NqWu/EvFKVa/sZAIgspxypu7scRKF.', 'nguyen', 'thaihiep', NULL, 1),
(17, 'testuser@gmail.com', '$2b$10$LJsoeU/0cOBPSavh3JoFveW4QBQlIWoCX5WsNsQTFQ4uL7lhbcR3G', 'test', 'user', '/imgs/avt/17.jpg', 1),
(18, 'hainguyen13097@gmail.com', NULL, 'Ngọc Hải', NULL, NULL, 1),
(19, 'admin@gmail.com', '$2b$10$fzJpw6ZlZ4ZASZ.R9XA.t.616JXoN/0kUwhwzE5CHCkdL/obXPjSG', 'Ngọc', 'Hải', NULL, 3);



CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `video`(`id`, `course_id`, `thumbnail`, `source`, `name`, `type`, `time`) VALUES
(0,6, 'https://i.insider.com/602ee9e3d3ad27001837f2af?width=1200&format=jpeg', 'https://drive.google.com/file/d/1He5zXduec-59InN7fgujwIBGGgQKpufF/view?usp=share_link', 'Rick roll 1', 'mp4', '3:32'),
(1,6, 'https://i.insider.com/602ee9e3d3ad27001837f2af?width=1200&format=jpeg', 'https://drive.google.com/file/d/1He5zXduec-59InN7fgujwIBGGgQKpufF/view?usp=share_link', 'Rick roll 2', 'mp4', '3:32');

CREATE TABLE `watch_list` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `watch_list` (`user_id`, `course_id`) VALUES
(17, 1),
(17, 2),
(17, 3);

ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `categories` ADD FULLTEXT KEY `name` (`name`);

ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_idx` (`lecture_id`),
  ADD KEY `id_idx1` (`promotion_id`),
  ADD KEY `id_idx2` (`category_id`);
ALTER TABLE `courses` ADD FULLTEXT KEY `name` (`name`);

alter table `academy-db`.users
add fulltext(firstname);

alter table `academy-db`.users
add fulltext(lastname);

alter table `academy-db`.courses
add fulltext(tiny_des);

ALTER TABLE `links`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `registered_courses`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `FK_Users_Courses_idx` (`course_id`);

ALTER TABLE `review`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `FK_Review_Course_idx` (`course_id`);

ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `sessions_expired_index` (`expired`);

ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Cat_Field_idx` (`field_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_idx` (`role_id`);

ALTER TABLE `video`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Video_Courses_idx` (`course_id`);

ALTER TABLE `watch_list`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `FK_Video_Courses_idx` (`course_id`);

ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `links`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `registered_courses`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `review`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `watch_list`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `courses`
  ADD CONSTRAINT `FK_Courses_Cat` FOREIGN KEY (`category_id`) REFERENCES `topics` (`id`),
  ADD CONSTRAINT `FK_Courses_Pro` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `FK_Courses_User` FOREIGN KEY (`lecture_id`) REFERENCES `users` (`id`);

ALTER TABLE `registered_courses`
  ADD CONSTRAINT `FK_RegisteredCourses_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_RegisteredCourses_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `review`
  ADD CONSTRAINT `FK_Review_Course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_Review_User` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `topics`
  ADD CONSTRAINT `FK_Cat_Field` FOREIGN KEY (`field_id`) REFERENCES `categories` (`id`);

ALTER TABLE `users`
  ADD CONSTRAINT `FK_Users_Role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `video`
  ADD CONSTRAINT `FK_Video_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

ALTER TABLE `watch_list`
  ADD CONSTRAINT `FK_WatchList_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_WatchList_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;
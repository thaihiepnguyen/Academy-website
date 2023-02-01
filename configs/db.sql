-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: academy-db
-- ------------------------------------------------------
-- Server version	8.0.31
-- Description: mysql database for academy project
-- Class: KTPM Web Programming - University of Science

DROP DATABASE IF EXISTS `academy-db`;

CREATE DATABASE `academy-db`;
USE `academy-db`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
);

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
  `rating` int(11) DEFAULT NULL
);


INSERT INTO `courses` (`id`, `name`, `thumbnail`, `tiny_des`, `full_des`, `price`, `promotion_id`, `last_modify`, `status`, `topic_id`, `lecture_id`, `rating`) VALUES
(1, 'Python Website Full Tutorial', NULL, 'Flask, Authentication, Databases & More', 'Learn the PHP programming language in this full course / tutorial. The course is designed for new programmers, and will introduce common programming topics using the PHP language.', 489000, NULL, NULL, 1, 1, 9, 4),
(2, 'Python Machine Learning Tutorials', NULL, 'This is my 2019 python machine learning tutorial introduction', '<p><span dir="auto" class="style-scope yt-formatted-string">In this python machine learning tutorial I go through implementing the K nearest neighbor algorithm. I show how to train and test a KNN model and then how to look at unique data and see the neighbors for individual data points. ⭐ Kite is a free AI-powered coding assistant for Python that will help you code smarter and faster. Integrates with Atom, PyCharm, VS Code, Sublime, Vim, and Spyder. I''ve been using Kite for 6 months and I love it! </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqblBUM1NyRzc3WXJXZW40cG10azhxTjBnR0ljd3xBQ3Jtc0treGZFYnZ5U0NuTHhCbzU1QlJ3WkV1RC1mVHEyZnBpTlVEanBvcFlIdTJWbDk0eklSeE4wT0lLbVljR1dYSXhBRnQxZTdiZ0R6ZVJRMG9BN0FNbS05cmxMd1RwMTE0ODJNSDc3bXlUeDhMZG5TalhzTQ&amp;q=https%3A%2F%2Fkite.com%2Fdownload%2F%3Futm_medium%3Dreferral%26utm_source%3Dyoutube%26utm_campaign%3Dtechwithtim%26utm_content%3Ddescription-only&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://kite.com/download/?utm_medium...</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">Text-Based Tutorial &amp; Code: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbVJfSEJxUHF4YU1nUnctNDdOVlNOVUNObVc1UXxBQ3Jtc0trcEo5M2E2d2t5ZGlZNERsUnVvTVNrWVZKSmstcGVBT3BxeXhQdVlwNTFyU1pRaC1nWFlRRnV2VVpubU5abDF5R2hSVWhza0dqbG9rMEt0aEhZdGJKOHo3TGJsYkcyVjRjSGlmSnpzYWtfVjdBTkNDWQ&amp;q=https%3A%2F%2Ftechwithtim.net%2Ftutorials%2Fmachine-learning-python%2Fk-nearest-neighbors-3%2F&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://techwithtim.net/tutorials/mac...</a><span dir="auto" class="style-scope yt-formatted-string"> ************************************************************** </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">WEBSITE: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbFRkU2hVNGZFMFBFOHVfVGF4c3R0Z0pYTFVFZ3xBQ3Jtc0trT09rUk1JN2NIajJyVk5NX3dZU1RpWnR0Q0VERV8xeHpqUWI0dmRHQWtEbGg2LTlDQlMzX3hpa2t3d1d3S1VFd3lseGpyakF1TXJ5cmxFVGpEMUhFS25uRmx1a3JFYTY1QVNpRVdVbmNHVmVtb3BzQQ&amp;q=https%3A%2F%2Ftechwithtim.net%2F&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://techwithtim.net</a></p>
<p><span dir="auto" class="style-scope yt-formatted-string"> proXPN VPN: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbGR4aFlwVzV3UTJOemRLQzlXZEhZdkdEaGt1UXxBQ3Jtc0ttTEFFQmJUSjNWRHg4b21PZGxoTkJpRUNlSV95U01Jbk5Rc3BCcEhWWm45SEtoT3ZialVvWUdlMGNhdVR2d3VXMlJjVGlWRjlCMEhWUzhqQTIwcFMwWDU2M3dkR1F1S3paUW9IR0ZvcjBpUF9na1BwQQ&amp;q=https%3A%2F%2Fsecure.proxpn.com%2F%3Fa_aid%3D5c34b30d44d9d&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://secure.proxpn.com/?a_aid=5c34...</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">Use the Code "SAVE6144"</span></p>
<p><span dir="auto" class="style-scope yt-formatted-string"> For 50% Off! One-Time Donations: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqazFJQjBEM091RWpTQVN5bGNhWXUwZFVSS05FZ3xBQ3Jtc0tub2N4amRVczREZnRtR1ZMdEYyaFJGX2tmSDJ6SnBVQ3hLQTlZUlVFU1ZYRDV5TzBGczVwbldIc3YydlNVbFBqT2NSSGstV2YtbjYzNUFNS0thZ25wYUJmU1ZncHRkaGxmbkt6TVlCN1ZJNHctN2Jwaw&amp;q=https%3A%2F%2Fgoo.gl%2FpbCE9J&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://goo.gl/pbCE9J</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">Support the Channel: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqa200LUU5eUJEaEwwaWx5QlZzT2ppeklUOFVRUXxBQ3Jtc0tuLXprLVp3czBCQWl2MGlMazE1X213YTdFVVlwYVJ1QUJ5eWdJeFFQLUxIMG9kc1NDa1lrRjFHN29BRHl2ZnhxbFJpX0ZrVTN1aXk1Yng0a0hydVlXLTJSNTBBc0tKSUhTQzlEc2JKOElYS1Q5WWwyWQ&amp;q=https%3A%2F%2Fwww.patreon.com%2Ftechwithtim&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://www.patreon.com/techwithtim</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">Twitter: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbEVFUlhyRnVjSDVIVTZtYUJCTFpiemVZYS1xd3xBQ3Jtc0ttSzhmektoa01rUnBqdzFxYmFJS1lySHVVaGhVVFJGbTRKX1RWWkw0MDVySmNTUl9RS0FMUGtIdGFUN1hIV0JyeUs5dFg2Yzk2bFQ5YUtYMEM1bFZTemdYQ0JJZmt2Z2gwdVJuVXlPblhlQ0IyeDNBYw&amp;q=https%3A%2F%2Ftwitter.com%2FTechWithTimm&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://twitter.com/TechWithTimm</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">Join my discord server: </span><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbGVRamtYdE02ZTRQMDJ3dWhBLThPdFoxbGtUd3xBQ3Jtc0ttdW9DTmZqdzJMTllpUlpRa3FWNS12ajFYY1IxZXg1YmliTHFZUDRXUndWeV9HNXdodUpxTlkxcmlyZFl4NjhMcDRKQWZ4aGl1NTBua3pYcnNVMVRpbmlXdUNMdjNVVEE5UWdmb3E1aEdFRlFvb0t1dw&amp;q=https%3A%2F%2Fdiscord.gg%2Fpr2k55t&amp;v=TQKI0KE-JYY" rel="nofollow noopener" target="_blank" dir="auto">https://discord.gg/pr2k55t</a><span dir="auto" class="style-scope yt-formatted-string"> </span></p>
<p><span dir="auto" class="style-scope yt-formatted-string">**************************************************************</span></p>
<p><span dir="auto" class="style-scope yt-formatted-string"> Please leave a LIKE and SUBSCRIBE for more content!</span></p>
<p><span dir="auto" class="style-scope yt-formatted-string"> Tags: tech with tim,python tutorials,sklearn python,sklearn tutorial,tensorflow python,tensorflow python tutorial,tensorflow python tutorial for beginners,machine learning with python,python machine learning for beginners,python machine learning tutorial,machine learning,artificial intelligence,machine learning tutorial 2019</span></p>', 500000, NULL, NULL, 1, 1, 9, 5),
(3, 'The Ultimate Self-Taught Developer Curriculum', NULL, 'Developer Curriculum', NULL, 600000, NULL, NULL, 1, 1, 9, 3),
(4, 'Full Stack Web Development for Beginners', NULL, 'Full Course on HTML, CSS, JavaScript, Node.js, MongoDB', NULL, 1000000, NULL, NULL, 1, 2, 10, 2),
(5, 'React State Management', NULL, 'Intermediate JavaScript Course', NULL, 750000, NULL, NULL, 1, 2, 10, 4),
(6, 'Autodesk Fusion 360 Tutorial for Beginners', NULL, 'Learn the basics of designing', NULL, 650000, NULL, NULL, 1, 2, 10, 2),
(7, 'Figma Tutorial for UI Design', NULL, 'In this Figma course, you will learn how to use Figma for UI Design', NULL, 750000, NULL, NULL, 1, 3, 10, 1),
(8, 'Photoshop for Beginners', NULL, 'Go from beginner to pro in 23 lessons', NULL, 900000, NULL, NULL, 1, 3, 10, 4),
(9, 'How To Use Canva For BEGINNERS! (Canva Tutorial 2020)', NULL, 'In this Canva tutorial video, I''ll be covering all of Canva', NULL, 850000, NULL, NULL, 1, 4, 10, 3),
(10, 'C++ Full Tutorial For Beginner', NULL, 'C++ is a cross-platform language that can be used to create high-performance applications', NULL, 100000, NULL, NULL, 0, 1, 20, 4);

CREATE TABLE `links` (
  `user_id` int(11) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL
);


CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
);


INSERT INTO `promotion` (`id`, `name`, `start_date`, `end_date`) VALUES
(1, 'Discount 10%', '2022-12-13', '2022-12-28');


CREATE TABLE `registered_courses` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
);

INSERT INTO `registered_courses` (`user_id`, `course_id`) VALUES
(17, 1),
(17, 4);

CREATE TABLE `shopping_cart` (
    `user_id` int(11) NOT NULL ,
    `course_id` int(11) NOT NULL
);

INSERT INTO `shopping_cart` (`user_id`, `course_id`) VALUES
(17, 1),
(17, 4);


CREATE TABLE `review` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `comment` varchar(2000) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
);


CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
);

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Học viên'),
(2, 'Giảng viên'),
(3, 'Quản trị viên');


CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `sess` json NOT NULL,
  `expired` datetime NOT NULL
);

CREATE TABLE `topics` (
  `topicId` int(11) NOT NULL,
  `topicName` varchar(255) DEFAULT NULL,
  category_id int(11) DEFAULT NULL
);

INSERT INTO `topics` (`topicId`, `topicName`, category_id) VALUES
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
  `image` varchar(2048) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `enable` boolean DEFAULT 1
);

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `image`, `role_id`, `enable`) VALUES
(1, 'maddogmichel@chavezschool.org', 'qwert123', 'maddog', 'michel', 'public/images/avt/1.png', 1, 1),
(2, 'ash33349599@gmail.com', '123456789h', 'ashley', 'sensor', 'public/images/avt/2.png', 1, 1),
(3, 'fatal0g1c@gmail.com', '0987654321j', 'fatal', 'shit', 'public/images/avt/3.png', 1, 1),
(4, 'allfit34541234@pickuplanet.com', 'mot23456789', 'allfit', 'prise', 'public/images/avt/4.png', 3, 1),
(5, 'surjiksenya@elitemotions.com', 'reallystrongpwd', 'surjik', 'senya', 'public/images/avt/5.png', 2, 1),
(6, 'korneevvitalick@imaanpharmacy.com', '1234thisispwd', 'vitalick', 'kornee', 'public/images/avt/7.png', 2, 1),
(7, 'nguyenvannam@gmail.com', 'namkhongdeptrai', 'nam', 'nguyen', 'public/images/avt/8.png', 2, 1),
(8, 'thaihiep232002@gmail.com', '1234567', 'thaihiep', 'nguyen', NULL, 1, 1),
(9, 'techwithtim@gmail.com', 'techtim', 'Tim', 'Tech', NULL, 2, 1),
(10, 'freecodecamp@gmail.com', 'codecampfree', 'free', 'campcode', NULL, 2, 1),
(11, 'thaihiep@gmail.com', '1234567', 'thai', 'hiep', NULL, 1, 1),
(12, 'quangbinh@gmail.com', '$2a$10$ey5e1r3lrtn41kKfd5Q5FuB5s.uQGmym3ei2oLKfn3MtqbC1GlxEa', 'binh', 'quang', NULL, 1, 1),
(13, 'user@gmail.com', '$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.', 'user', 'test', NULL, 1, 1),
(14, 'thaihiepnguyen@gmail.com', '$2a$10$.ESoYDK1/FEFQ9mzejXxbOUZoUiFHkpt/nWDgnThKepb2g0z/PZIG', 'thaihiep', 'nguyen', NULL, 1, 1),
(15, 'thaihiepp@gmail.com', '$2a$10$h35zayIz/gvBcsCCsA5egO6tqSDvH7MC.Ih7hNxygSqbnDQgmRMGa', 'hiep', 'thai', NULL, 1, 1),
(16, 'qwert@gmail.com', '$2a$10$oTNEtd2OANUI1zxOz7yWeu7NqWu/EvFKVa/sZAIgspxypu7scRKF.', 'nguyen', 'thaihiep', NULL, 1, 1),
(17, 'testuser@gmail.com', '$2b$10$LJsoeU/0cOBPSavh3JoFveW4QBQlIWoCX5WsNsQTFQ4uL7lhbcR3G', 'test', 'user', '/imgs/avt/17.jpg', 1, 1),
(18, 'hainguyen13097@gmail.com', NULL, 'Ngọc Hải', NULL, NULL, 1, 1),
(19, 'admin@gmail.com', '$2b$10$fzJpw6ZlZ4ZASZ.R9XA.t.616JXoN/0kUwhwzE5CHCkdL/obXPjSG', 'Ngọc', 'Hải', NULL, 3, 1),
(20, 'thecherno@gmail.com', 'The Cherno', 'The', 'Cherno', NULL, 2, 1);



CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `free` boolean DEFAULT false
);
INSERT INTO `video`(`id`, `course_id`, `thumbnail`, `source`, `name`, `type`, `time`, `free`) VALUES
(1, 10, NULL, '18c3MTX0PK0', 'Welcome to C++', 'mp4', '7:04', false),
(2, 10, NULL, '1OsGXuNA5cc', 'How to Setup C++ on Windows', 'mp4', '8:35', false),
(3, 10, NULL, 'dam0GPOAvVI', 'Python Website Full Tutorial', 'mp4', '2:16:39', false),
(4, 2, NULL, 'ujTCoH21GlA', 'Python Machine Learning Tutorial #1 - Introduction', 'mp4', '2:16:39', false),
(5, 2, NULL, '45ryDIPHdGg', 'Python Machine Learning Tutorial #2 - Linear Regression p.1', 'mp4', '2:16:39', false),
(6, 2, NULL, '1BYu65vLKdA', 'Python Machine Learning Tutorial #3 - Linear Regression p.2', 'mp4', '2:16:39', false),
(7, 2, NULL, '3AQ_74xrch8', 'Python Machine Learning Tutorial #4 - Saving Models & Plotting Data', 'mp4', '2:16:39', false),
(8, 2, NULL, 'ddqQUz9mZaM', 'Python Machine Learning Tutorial #5 - KNN p.1 - Irregular Data', 'mp4', '2:16:39', false),
(9, 2, NULL, 'vwLT6bZrHEE', 'Python Machine Learning Tutorial #6 - KNN p.2 - How does K Nearest Neighbors Work?', 'mp4', '2:16:39', false),
(10, 2, NULL, 'TQKI0KE-JYY', 'Python Machine Learning Tutorial #7 - KNN p.3 - Implementation', 'mp4', '2:16:39', false);


CREATE TABLE `watch_list` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
);

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
  ADD KEY `id_idx2` (`topic_id`);
ALTER TABLE `courses` ADD FULLTEXT KEY `name` (`name`);

alter table `academy-db`.users
add fulltext(firstname);

alter table `academy-db`.users
add fulltext(lastname);

alter table `academy-db`.courses
add fulltext(tiny_des);

alter table `academy-db`.courses
add fulltext(name);

alter table `academy-db`.courses
add fulltext(full_des);


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
  ADD PRIMARY KEY (`topicId`),
  ADD KEY `FK_Cat_Category_idx` (category_id);

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
  MODIFY `topicId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `watch_list`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

ALTER TABLE `courses`
  ADD CONSTRAINT `FK_Courses_Topic` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`topicId`),
  ADD CONSTRAINT `FK_Courses_Pro` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  ADD CONSTRAINT `FK_Courses_User` FOREIGN KEY (`lecture_id`) REFERENCES `users` (`id`);

ALTER TABLE `registered_courses`
  ADD CONSTRAINT `FK_RegisteredCourses_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_RegisteredCourses_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `review`
  ADD CONSTRAINT `FK_Review_Course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_Review_User` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `topics`
  ADD CONSTRAINT `FK_Topics_Cate` FOREIGN KEY (category_id) REFERENCES `categories` (`id`);

ALTER TABLE `users`
  ADD CONSTRAINT `FK_Users_Role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

ALTER TABLE `video`
  ADD CONSTRAINT `FK_Video_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

ALTER TABLE `watch_list`
  ADD CONSTRAINT `FK_WatchList_Courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `FK_WatchList_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: academy-db
-- ------------------------------------------------------
-- Server version	8.0.31
DROP DATABASE IF EXISTS `academy-db`;

CREATE DATABASE `academy-db`;
USE `academy-db`;

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO categories VALUES (1,'Web Development');
INSERT INTO categories VALUES (2,'Mobile Application Development');

DROP TABLE IF EXISTS links;

CREATE TABLE links (
  user_id int NOT NULL AUTO_INCREMENT,
  website varchar(255) DEFAULT NULL,
  fb varchar(255) DEFAULT NULL,
  github varchar(255) DEFAULT NULL,
  youtube varchar(255) DEFAULT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS promotion;

CREATE TABLE promotion (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO promotion VALUES (1,'Discount 10%','2022-12-13','2022-12-28');


DROP TABLE IF EXISTS role;

CREATE TABLE `role` (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO role VALUES (1,'Học viên');
INSERT INTO role VALUES (2,'Giảng viên');
INSERT INTO role VALUES (3,'Quản trị viên');

DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  sid varchar(255) NOT NULL,
  sess json NOT NULL,
  expired datetime NOT NULL,
  PRIMARY KEY (sid),
  KEY sessions_expired_index (expired)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO sessions VALUES ('dL--8WyzTy20EGd32HFEcaNbYS42biQo','{\"auth\": false, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"authUser\": null}','2022-12-23 05:18:22');
INSERT INTO sessions VALUES ('gQfte8LWQvAZ4PD37huvpEqYatBGS1jc','{\"auth\": false, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": null}','2022-12-22 05:57:01');
INSERT INTO sessions VALUES ('OynBtvz7aNkz5-AijvIFF_a5kaNTQIMd','{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": {\"id\": 13, \"email\": \"user@gmail.com\", \"image\": null, \"role_id\": 1, \"lastname\": \"test\", \"password\": \"$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.\", \"firstname\": \"user\"}}','2022-12-22 17:54:27');
INSERT INTO sessions VALUES ('P-81r_-PceHnvX8JOJ8QdIwGzZpYys2C','{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": {\"id\": 13, \"email\": \"user@gmail.com\", \"image\": null, \"role_id\": 1, \"lastname\": \"test\", \"password\": \"$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.\", \"firstname\": \"user\"}}','2022-12-23 05:22:31');
INSERT INTO sessions VALUES ('wr9mfN6G6xVVPTKTFJ2DAogScPZTm6wn','{\"auth\": false, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/2\", \"authUser\": null}','2022-12-22 09:07:18');
INSERT INTO sessions VALUES ('zXZZObQ-sE-qs0lasYo8pnS7o9bJ7RUZ','{\"auth\": true, \"cookie\": {\"path\": \"/\", \"expires\": null, \"httpOnly\": true, \"originalMaxAge\": null}, \"retUrl\": \"/courses/byCat/1\", \"authUser\": {\"id\": 13, \"email\": \"user@gmail.com\", \"image\": null, \"role_id\": 1, \"lastname\": \"test\", \"password\": \"$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.\", \"firstname\": \"user\"}}','2022-12-22 17:12:54');


DROP TABLE IF EXISTS topics;

CREATE TABLE topics (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  field_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FK_Cat_Field_idx (field_id),
  CONSTRAINT FK_Cat_Field FOREIGN KEY (field_id) REFERENCES categories (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO topics VALUES (1,'Web Front-end Development',1);
INSERT INTO topics VALUES (2,'Web Back-end Development',1);
INSERT INTO topics VALUES (3,'Web Full-stack Development',1);
INSERT INTO topics VALUES (4,'Android Development',2);
INSERT INTO topics VALUES (5,'IOS Developement',2);
INSERT INTO topics VALUES (6,'Cross-platform Development',2);


DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  firstname varchar(255) DEFAULT NULL,
  lastname varchar(255) DEFAULT NULL,
  image varchar(100) DEFAULT NULL,
  role_id int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY id_idx (role_id),
  CONSTRAINT FK_Users_Role FOREIGN KEY (role_id) REFERENCES `role` (id)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO users VALUES (1,'maddogmichel@chavezschool.org','qwert123','maddog','michel','public/images/avt/1.png',1);
INSERT INTO users VALUES (2,'ash33349599@gmail.com','123456789h','ashley','sensor','public/images/avt/2.png',1);
INSERT INTO users VALUES (3,'fatal0g1c@gmail.com','0987654321j','fatal','shit','public/images/avt/3.png',1);
INSERT INTO users VALUES (4,'allfit34541234@pickuplanet.com','mot23456789','allfit','prise','public/images/avt/4.png',3);
INSERT INTO users VALUES (5,'surjiksenya@elitemotions.com','reallystrongpwd','surjik','senya','public/images/avt/5.png',2);
INSERT INTO users VALUES (6,'korneevvitalick@imaanpharmacy.com','1234thisispwd','vitalick','kornee','public/images/avt/7.png',2);
INSERT INTO users VALUES (7,'nguyenvannam@gmail.com','namkhongdeptrai','nam','nguyen','public/images/avt/8.png',2);
INSERT INTO users VALUES (8,'thaihiep232002@gmail.com','1234567','thaihiep','nguyen',NULL,1);
INSERT INTO users VALUES (9,'techwithtim@gmail.com','techtim','Tim','Tech',NULL,2);
INSERT INTO users VALUES (10,'freecodecamp@gmail.com','codecampfree','free','campcode',NULL,2);
INSERT INTO users VALUES (11,'thaihiep@gmail.com','1234567','thai','hiep',NULL,1);
INSERT INTO users VALUES (12,'quangbinh@gmail.com','$2a$10$ey5e1r3lrtn41kKfd5Q5FuB5s.uQGmym3ei2oLKfn3MtqbC1GlxEa','binh','quang',NULL,1);
INSERT INTO users VALUES (13,'user@gmail.com','$2a$10$2h9THVtcELsdzR/l4FlZDOD/ZIPng.f9VFgh4yFkiygpP/Z.18Yo.','user','test',NULL,1);
INSERT INTO users VALUES (14,'thaihiepnguyen@gmail.com','$2a$10$.ESoYDK1/FEFQ9mzejXxbOUZoUiFHkpt/nWDgnThKepb2g0z/PZIG','thaihiep','nguyen',NULL,1);
INSERT INTO users VALUES (15,'thaihiepp@gmail.com','$2a$10$h35zayIz/gvBcsCCsA5egO6tqSDvH7MC.Ih7hNxygSqbnDQgmRMGa','hiep','thai',NULL,1);
INSERT INTO users VALUES (16,'qwert@gmail.com','$2a$10$oTNEtd2OANUI1zxOz7yWeu7NqWu/EvFKVa/sZAIgspxypu7scRKF.','nguyen','thaihiep',NULL,1);
INSERT INTO users VALUES (17,'testuser@gmail.com','$2a$10$mX6pOOGAG/zSXX3T/OUHxeAWnw86JgvVl1WK7Ik.3K7ersuhBA.RW','test','user',NULL,1);



DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
  id int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  thumbnail varchar(100) DEFAULT NULL,
  tiny_des varchar(1023) DEFAULT NULL,
  full_des text,
  price bigint DEFAULT NULL,
  promotion_id int DEFAULT NULL,
  last_modify varchar(100) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  category_id int DEFAULT NULL,
  lecture_id int DEFAULT NULL,
  rating int DEFAULT NULL,
  
  levelCourse varchar(255) DEFAULT NULL,
  durationCourse int DEFAULT 0,
  weeklyHours int DEFAULT 0,
  enrolled int DEFAULT 0,
  discount int DEFAULT 0,
  requirements text DEFAULT NULL,
  overview text DEFAULT NULL,
  includedItem text DEFAULT NULL,
  
  PRIMARY KEY (id),
  KEY id_idx (lecture_id),
  KEY id_idx1 (promotion_id),
  KEY id_idx2 (category_id),
  CONSTRAINT FK_Courses_Cat FOREIGN KEY (category_id) REFERENCES topics (id),
  CONSTRAINT FK_Courses_Pro FOREIGN KEY (promotion_id) REFERENCES promotion (id),
  CONSTRAINT FK_Courses_User FOREIGN KEY (lecture_id) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO courses VALUES (1,'Python Website Full Tutorial',NULL,'Flask, Authentication, Databases & More','Learn the PHP programming language in this full course / tutorial. The course is designed for new programmers, and will introduce common programming topics using the PHP language.',489000,NULL,NULL,1,1,9,4,"",0,0,0,0,"","","");
INSERT INTO courses VALUES (2,'What To Learn To Become a Python Backend Developer',NULL,'Python Backend Developer',NULL,500000,NULL,NULL,1,1,9,5,"",0,0,0,0,"","","");
INSERT INTO courses VALUES (3,'The Ultimate Self-Taught Developer Curriculum',NULL,'Developer Curriculum',NULL,600000,NULL,NULL,1,1,9,4,"",0,0,0,0,"","","");
INSERT INTO courses VALUES (4,'Full Stack Web Development for Beginners',NULL,'Full Course on HTML, CSS, JavaScript, Node.js, MongoDB',NULL,1000000,NULL,NULL,1,1,10,5,"",0,0,0,0,"","","");
INSERT INTO courses VALUES (5,'React State Management',NULL,'Intermediate JavaScript Course',NULL,750000,NULL,NULL,1,1,10,4,"",0,0,0,0,"","","");


DROP TABLE IF EXISTS review;
CREATE TABLE review (
  user_id int NOT NULL AUTO_INCREMENT,
  course_id int NOT NULL,
  `comment` varchar(2000) DEFAULT NULL,
  rating int DEFAULT NULL,
  PRIMARY KEY (user_id,course_id),
  KEY FK_Review_Course_idx (course_id),
  CONSTRAINT FK_Review_Course FOREIGN KEY (course_id) REFERENCES courses (id),
  CONSTRAINT FK_Review_User FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS video;

CREATE TABLE video (
  id int NOT NULL AUTO_INCREMENT,
  course_id int DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time` int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY FK_Video_Courses_idx (course_id),
  CONSTRAINT FK_Video_Courses FOREIGN KEY (course_id) REFERENCES courses (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS watch_list;

CREATE TABLE watch_list (
  user_id int NOT NULL AUTO_INCREMENT,
  course_id int NOT NULL,
  PRIMARY KEY (user_id,course_id),
  KEY FK_Video_Courses_idx (course_id),
  CONSTRAINT FK_WatchList_Courses FOREIGN KEY (course_id) REFERENCES courses (id),
  CONSTRAINT FK_WatchList_Users FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

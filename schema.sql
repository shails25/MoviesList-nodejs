CREATE SCHEMA `movies`;
USE `movies`;

CREATE TABLE `liked_movies` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `Title` varchar(255) DEFAULT NULL,
                                `Year` varchar(50) DEFAULT NULL,
                                `Poster` varchar(300) DEFAULT NULL,
                                `Type` varchar(100) DEFAULT NULL,
                                `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                `udpated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`user_name` int NOT NULL UNIQUE,
	`pass` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `categories` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tasks` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL DEFAULT '255',
	`description` text NOT NULL,
	`isDone` boolean NOT NULL,
	`user_id` int NOT NULL,
	`category_id` int,
	PRIMARY KEY (`id`)
);


ALTER TABLE `categories` ADD CONSTRAINT `categories_fk2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk4` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk5` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);
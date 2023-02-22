# Introduction - Let’s try to understand the project structure.

# Entry Point
index.php: the entry-point of our application. It will act as a front-controller of our application.

# Configuration
inc/config.php: holds the configuration information of our application. Mainly, it will hold the database credentials.
inc/bootstrap.php: used to bootstrap our application by including the necessary files.

# DB access layer
Model/Database.php: the database access layer which will be used to interact with the underlying MySQL database.
Model/UserModel.php: the User model file which implements the necessary methods to interact with the users table in the MySQL database.

# Utility for end user
Controller/Api/BaseController.php: a base controller file which holds common utility methods.
Controller/Api/UserController.php: the User controller file which holds the necessary application code to entertain REST API calls.

# DB
$use rest_api_demo;
$CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
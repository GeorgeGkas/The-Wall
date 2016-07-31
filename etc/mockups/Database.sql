SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `authors` (
  `author_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `author_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_avatar` text COLLATE utf8_bin NOT NULL,
  `author_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`author_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` int(10) unsigned NOT NULL,
  `comment_author` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_state` enum('approved','pending','deleted') COLLATE utf8_bin NOT NULL DEFAULT 'pending',
  `comment_like_count` int(10) unsigned NOT NULL,
  `comment_author_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`comment_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `email_subscriptions` (
  `subscription_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subscription_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_date` datetime NOT NULL,
  `subscription_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`subscription_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

CREATE TABLE IF NOT EXISTS `likes_counter` (
  `like_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `like_type` enum('post','comment') COLLATE utf8_bin NOT NULL,
  `like_content_ID` int(10) unsigned NOT NULL,
  `like_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`like_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `posts` (
  `post_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `author_ID` int(10) unsigned NOT NULL,
  `post_date` datetime NOT NULL,
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` enum('draft','published','deleted') COLLATE utf8_bin NOT NULL DEFAULT 'draft',
  `post_type` enum('img','quote','video') COLLATE utf8_bin NOT NULL,
  `post_like_count` int(10) unsigned NOT NULL DEFAULT '0',
  `post_comment_count` int(10) unsigned NOT NULL DEFAULT '0',
  `post_has_article` tinyint(1) NOT NULL DEFAULT '0',
  `article_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`post_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
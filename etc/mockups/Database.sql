SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `NodeJSBlog`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE IF NOT EXISTS `authors` (
  `author_ID` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `author_email` varchar(100) COLLATE utf8_bin NOT NULL,
  `author_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_avatar` text COLLATE utf8_bin NOT NULL,
  `author_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`author_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2 ;


-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL,
  `comment_author` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_approved` tinyint(4) NOT NULL DEFAULT '0',
  `comment_like_count` int(10) unsigned NOT NULL,
  `comment_author_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `comments`:
--   `comment_post_ID`
--       `posts` -> `post_ID`
--

-- --------------------------------------------------------

--
-- Table structure for table `email_subscriptions`
--

CREATE TABLE IF NOT EXISTS `email_subscriptions` (
  `subscription_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `subscription_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscription_date` datetime NOT NULL,
  `subscription_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`subscription_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `likes_counter`
--

CREATE TABLE IF NOT EXISTS `likes_counter` (
  `like_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `like_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `like_content_ID` bigint(20) NOT NULL,
  `like_IP` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`like_ID`),
  KEY `like_ID` (`like_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `post_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `author_ID` bigint(20) unsigned NOT NULL,
  `post_date` datetime NOT NULL,
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'draft',
  `post_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `post_like_count` int(10) unsigned NOT NULL DEFAULT '0',
  `post_comment_count` int(11) unsigned NOT NULL DEFAULT '0',
  `post_has_article` tinyint(4) NOT NULL DEFAULT '0',
  `article_title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`post_ID`),
  KEY `author_ID` (`author_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `posts`:
--   `author_ID`
--       `authors` -> `author_ID`
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comment_to_post` FOREIGN KEY (`comment_post_ID`) REFERENCES `posts` (`post_ID`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `post_to_author` FOREIGN KEY (`author_ID`) REFERENCES `authors` (`author_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-04-10 08:38:21
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- 表的结构 `resource`
--

CREATE TABLE IF NOT EXISTS `resource` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `path` varchar(200) NOT NULL,
  `size` varchar(50) NOT NULL,
  `upload_user` varchar(50) NOT NULL,
  `upload_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `resource`
--

INSERT INTO `resource` (`id`, `path`, `size`, `upload_user`, `upload_time`, `type`) VALUES
(6, 'http://10.106.88.43:3000/upload/imgs/IE8stack_overflow.jpg', '12.625KB', 'admin', '2015-04-10 06:36:11', 'imgs'),
(8, 'http://10.106.88.43:3000/upload/word/a.docx', '0KB', 'admin', '2015-04-10 06:36:47', 'word'),
(9, 'http://10.106.88.43:3000/upload/excel/b.xlsx', '6.1787109375KB', 'admin', '2015-04-10 06:36:53', 'excel'),
(10, 'http://10.106.88.43:3000/upload/music/卡农.mp3', '3856.986328125KB', 'admin', '2015-04-10 06:37:01', 'music');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



/*TABLE user*/
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `team` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;



INSERT INTO `user` (`id`, `username`, `password`, `email`, `team`) VALUES
(0, 'root', 'root123456', 'admin@admin.com', 'root');













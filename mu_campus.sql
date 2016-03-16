-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2016 at 03:33 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `timemap`
--

-- --------------------------------------------------------

--
-- Table structure for table `mu_campus`
--

CREATE TABLE IF NOT EXISTS `mu_campus` (
  `gid` int(3) DEFAULT NULL,
  `tagName` varchar(40) NOT NULL,
  `name` varchar(31) DEFAULT NULL,
  `location` varchar(41) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mu_campus`
--

INSERT INTO `mu_campus` (`gid`, `tagName`, `name`, `location`) VALUES
(1, '', 'Aldi', 'POINT(-6.5964444 53.3818757)'),
(2, 'JH/T', 'John Hume Building', 'POINT(-6.60002669999998 53.3840296500001)'),
(23, '', 'Students Union', 'POINT(-6.603828 53.38309)'),
(3, '', 'College Chapel', 'POINT(-6.59830494999997 53.3798061)'),
(4, '', 'Saint Patricks House', 'POINT(-6.59771579999997 53.3795186500001)'),
(5, '', 'Russell Library', 'POINT(-6.59799534999999 53.3789788)'),
(6, '', 'Saint Marys House', 'POINT(-6.59896279999998 53.3791522000001)'),
(7, '', 'Loftus Hall', 'POINT(-6.59837259999998 53.3784560500001)'),
(8, '', 'Junior Infirmary', 'POINT(-6.5979472 53.37775415)'),
(9, '', 'National Science Museum', 'POINT(-6.59820365 53.37867245)'),
(10, '', 'Campus planning and development', 'POINT(-6.5974144 53.3789029)'),
(11, '', 'Boiler house', 'POINT(-6.59706315 53.37894635)'),
(16, '', 'The Casey Changing Rooms', 'POINT(-6.59678979999993 53.37842475)'),
(17, '', 'Logic House', 'POINT(-6.59616059999999 53.3781431500001)'),
(22, '', 'Saint Mars', 'POINT(-6.59413054999993 53.3801680999999)'),
(43, '', 'Killary Hall', 'POINT(-6.59945975 53.3865479000001)'),
(24, '', 'St. Catherines Oratory', 'POINT(-6.5994637 53.3833949500001)'),
(26, '', 'St. Annes Building', 'POINT(-6.5984757 53.3832822)'),
(27, '', 'Village Common Room', 'POINT(-6.59686749999995 53.3856649000001)'),
(28, '', 'Riordan Hall', 'POINT(-6.59734975 53.38581075)'),
(29, '', 'Leavey Hall', 'POINT(-6.59727315 53.38545405)'),
(30, '', 'Hargadon Hall', 'POINT(-6.59786079999995 53.3857766500001)'),
(31, '', 'Mullin Hall', 'POINT(-6.59779830000002 53.38541755)'),
(32, 'PE', 'Sport Complex', 'POINT(-6.60365229999996 53.3846259)'),
(33, '', 'Engineering Building', 'POINT(-6.60251364999997 53.3846591000001)'),
(34, '', 'M.A.P', 'POINT(-6.59914725000001 53.38370405)'),
(35, '', 'Student Service Centre', 'POINT(-6.59885579999997 53.3838038000001)'),
(36, '', 'Dodder Hall', 'POINT(-6.59838704999996 53.3861789500001)'),
(37, '', 'Carrick Hall', 'POINT(-6.59866894999997 53.38595665)'),
(38, '', 'Boyne Hall', 'POINT(-6.59919575000001 53.3861855000001)'),
(39, '', 'Avoca Hall', 'POINT(-6.5989113 53.3864081)'),
(40, '', 'small house 3', 'POINT(-6.5998452 53.38317865)'),
(41, '', 'small house 2', 'POINT(-6.5997444 53.38305355)'),
(42, '', 'small house 1', 'POINT(-6.5996454 53.38292715)'),
(44, '', 'Moy Hall', 'POINT(-6.59966874999995 53.3863655000001)'),
(45, '', 'Liffey Hall', 'POINT(-6.5999555 53.38657035)'),
(46, '', 'Halls of Residence', 'POINT(-6.5987922 53.3857341)'),
(47, '', 'Erne Hall', 'POINT(-6.59915855 53.38586145)'),
(48, '', 'Ormond House', 'POINT(-6.59476785 53.3823614)'),
(49, '', 'Deerpark House', 'POINT(-6.59443454999996 53.3820248500001)'),
(50, '', 'Swimming Pool', 'POINT(-6.59645574999999 53.3788879500001)'),
(51, '', 'Earlscourt House', 'POINT(-6.5949634 53.3818458)'),
(52, '', 'Kyldar House', 'POINT(-6.5939192 53.38222745)'),
(53, '', 'Donadea House', 'POINT(-6.59533059999999 53.3822129500001)'),
(54, '', 'Geraldine House', 'POINT(-6.59578564999993 53.3820888)'),
(55, '', 'Castlekeep House', 'POINT(-6.5939902 53.38185465)'),
(57, '', 'Heritage House', 'POINT(-6.59428964999995 53.3824931500001)'),
(58, '', 'Foyle Hall', 'POINT(-6.59969345 53.3860645)'),
(59, '', 'Gweedore Hall', 'POINT(-6.5999233 53.38587865)'),
(60, '', 'Joyce Hall', 'POINT(-6.6001464 53.3862396000001)'),
(61, '', 'Hurley Hall', 'POINT(-6.600382 53.3860443)'),
(62, '', 'Nore Hall', 'POINT(-6.60057044999999 53.3863767000001)'),
(63, '', 'Potters Hall', 'POINT(-6.60064074999994 53.3866163500001)'),
(64, '', 'Quiltey Hall', 'POINT(-6.60069749999994 53.38687395)'),
(75, 'RM', 'Rhetoric House', 'POINT(-6.59614294999994 53.37872235)'),
(76, '', 'Postroom', 'POINT(-6.59595489999998 53.3790557)'),
(77, '', 'Presidents Office', 'POINT(-6.59546015 53.37912145)'),
(78, '', 'Riverstown Lodge', 'POINT(-6.59532245 53.3793225)'),
(79, '', 'Riverstown Hall', 'POINT(-6.59518155000001 53.3794031500001)'),
(81, 'NMR/OCR', 'Music Technology Labulatory', 'POINT(-6.59606685 53.3779075000001)'),
(82, '', 'Library Store', 'POINT(-6.59649729999995 53.3777442500001)'),
(86, 'AULA', 'Aula Maxima', 'POINT(-6.59777989999997 53.3803481500001)'),
(87, '', 'Dunboyne House', 'POINT(-6.59663599999999 53.3792804000001)'),
(88, '', 'Humanity House', 'POINT(-6.59597845 53.37947375)'),
(89, '', 'Stoyte House', 'POINT(-6.59575954999997 53.3800739)'),
(90, '', 'New House', 'POINT(-6.5969786 53.38024335)'),
(92, 'CC', 'Computer Centre', 'POINT(-6.59671099999997 53.3809217000001)'),
(93, 'CC', 'Computer Centre Teaching Rooms', 'POINT(-6.59639315000001 53.3810164000001)'),
(97, '', 'Columba Centre', 'POINT(-6.59919645 53.3804802)'),
(100, '', 'Students Common Room', 'POINT(-6.60245015000001 53.3839955500001)'),
(110, 'RH', 'Rowan House', 'POINT(-6.59773580000001 53.3836839)'),
(111, 'ION/IONSEM', 'Iontas Building', 'POINT(-6.60044255 53.38469515)'),
(113, 'PCT', 'Science Building', 'POINT(-6.6005883 53.3830325000001)'),
(114, 'AX', 'Auxilia Building', 'POINT(-6.59837279999996 53.38420875)'),
(115, '', 'Saint Mary Square', 'POINT(-6.5984171 53.3793822)'),
(116, 'CB/B', 'Callan Building', 'POINT(-6.6027444 53.38318255)'),
(117, 'RH/ICT/WR', 'Hamilton and Rye Hall', 'POINT(-6.59913314999994 53.3849182499999)'),
(118, 'ELT/ESR', 'Education House', 'POINT(-6.59767629999999 53.3833664000001)'),
(119, 'TH/HA/HB/HC/HD/HE/HF/HH/HJ', 'Arts Building', 'POINT(-6.60156469999995 53.3837599000001)'),
(120, '', 'Gate Lodge (Security)', 'POINT(-6.59461374999998 53.3804674500001)'),
(123, '', 'John Paul II Library', 'POINT(-6.599724 53.3811696)'),
(124, '', 'Creche', 'POINT(-6.5995645 53.38509905)'),
(125, '', 'Hamilton Institute', 'POINT(-6.59863964999994 53.3847408500001)'),
(129, 'PE', 'Phoenix Sport Centre', 'POINT(-6.59620480000001 53.3852518500001)'),
(130, '', 'Post primary school Maynooth', 'POINT(-6.59620729999995 53.3846200500001)'),
(132, '', 'Parish Hall', 'POINT(-6.59553184999999 53.38310745)'),
(133, 'PH', 'Physics Hall', 'POINT(-6.595761 53.380012)');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 06:56 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c237_gymproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sessionId` int(11) NOT NULL,
  `date` date NOT NULL,
  `duration` int(11) NOT NULL,
  `bodyPart` varchar(20) NOT NULL,
  `exercise` varchar(50) NOT NULL,
  `food` varchar(500) NOT NULL,
  `sets` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`sessionId`, `date`, `duration`, `bodyPart`, `exercise`, `food`, `sets`) VALUES
(2, '2024-07-10', 50, 'Legs', 'Leg squats', 'idk', 10);

-- --------------------------------------------------------

--
-- Table structure for table `trainer`
--

CREATE TABLE `trainer` (
  `trainerId` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `contact` int(10) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `specialization` text NOT NULL,
  `age` int(3) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainer`
--

INSERT INTO `trainer` (`trainerId`, `name`, `contact`, `image`, `specialization`, `age`, `description`) VALUES
(1, 'ben', 98765432, 'pfp1.png', 'strength training', 30, 'Ben is a dedicated and experienced strength training specialist, known for his exceptional ability to help clients build muscle, increase endurance, and achieve their fitness goals. With a background in exercise science and years of hands-on experience, Ben combines his knowledge of physiology with practical training techniques to design personalized workout plans for each client. He emphasizes proper form, progressive overload, and balanced nutrition to ensure sustainable and effective results.'),
(2, 'john', 99781234, 'pfp2.png', 'losing weight', 40, '\r\nJohn is a passionate and knowledgeable weight loss specialist, dedicated to helping individuals achieve their fitness and health goals. With a comprehensive background in nutrition and fitness, John creates tailored programs that focus on sustainable weight loss through a combination of balanced diet plans, effective exercise routines, and behavioral changes.'),
(3, 'bazel', 98822881, 'pfp3.png', 'Keto diet', 23, 'Bazel is a renowned expert in the ketogenic diet, dedicated to helping individuals transform their health and achieve their fitness goals through low-carb, high-fat nutrition. With extensive training in nutritional science and years of practical experience, Bazel has become a go-to authority for those looking to embrace the keto lifestyle. His in-depth understanding of ketosis and metabolic health allows him to craft personalized meal plans that maximize fat burning, enhance energy levels, and improve overall well-being.\r\n\r\n'),
(4, 'chin xuan', 97213434, 'pfp4.png', 'calistsenic', 28, 'Chin Xuan is a dynamic and skilled calisthenics specialist, dedicated to helping individuals build strength, flexibility, and endurance through bodyweight training. With a background in kinesiology and extensive experience in calisthenics, Chin Xuan is adept at creating challenging and effective workout routines that utilize minimal equipment while maximizing results. His expertise in functional fitness allows clients to develop a strong, agile, and resilient body.'),
(5, 'Turritopsis Dohrnii Teo En Min', 99124321, 'bazel.png', 'yoga and flexibility training specialist', 18, 'En Ming is a dedicated and experienced yoga and flexibility training specialist, renowned for his holistic approach to physical and mental well-being. With a deep understanding of various yoga styles and flexibility techniques, En Ming creates customized programs that cater to individuals of all levels, from beginners to advanced practitioners. His sessions focus on enhancing flexibility, strength, balance, and inner peace through mindful movement and breathwork.'),
(6, 'Gabriel', 96788565, 'gabriel.png', 'Stamina and Endurance training', 18, '\r\nGabriel is a highly skilled and dedicated stamina and endurance training specialist, committed to helping individuals enhance their cardiovascular health, build resilience, and achieve peak physical performance. With a robust background in sports science and years of experience in endurance sports, Gabriel designs comprehensive training programs tailored to each client\'s fitness level and goals.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(10) NOT NULL,
  `contact` int(10) DEFAULT NULL,
  `dob` date NOT NULL,
  `image` varchar(1000) NOT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `contact`, `dob`, `image`, `name`, `email`, `username`, `password`) VALUES
(14, 98788888, '2024-07-18', 'gabriel.png', 'Benny Teo', '23026229@myrp.edu.sg', 'idk', 'idk');

-- --------------------------------------------------------

--
-- Table structure for table `workout`
--

CREATE TABLE `workout` (
  `workoutId` int(11) NOT NULL,
  `exerciseName` varchar(30) NOT NULL,
  `muscleGrp` varchar(30) NOT NULL,
  `reps` varchar(20) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `exampleVideo` varchar(1000) NOT NULL,
  `workoutDescription` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workout`
--

INSERT INTO `workout` (`workoutId`, `exerciseName`, `muscleGrp`, `reps`, `weight`, `exampleVideo`, `workoutDescription`) VALUES
(1, 'bicep curl', 'bicep', '10', '8-12kg', 'bicep.mp4', 'Targets your bicep and isolated that muscle group for optimal gains'),
(2, 'Lat pull down', 'Lats', '8-10 high intensity ', '0.5x of Body weight', 'latpulldown.mp4', 'Exercise Name: Lat Pulldown\r\n\r\nMuscle Group:\r\n\r\nPrimary: Latissimus Dorsi (Lats)\r\nSecondary: Biceps, Rhomboids, Trapezius'),
(3, 'Back rows', 'Lower back', '8-10 high intensity ', '0.75x of weight', 'rows.mp4', 'Back Rows\r\nExercise Name: Back Rows\r\n\r\nMuscle Group:\r\n\r\nPrimary: Middle Back (Rhomboids, Latissimus Dorsi)\r\nSecondary: Biceps, Rear Deltoids'),
(4, 'Leg squats', 'Thigh, Glute, Hamstring', '5', '1-1.2x body weight', 'squats.mp4', 'Exercise Name: Squat\r\n\r\nMuscle Group:\r\n\r\nPrimary: Quadriceps, Glutes\r\nSecondary: Hamstrings, Lower Back'),
(5, 'Tricep press down', 'Tricep', '15', '20kg-35kg', 'tricep.mp4', 'Tricep Press Down\r\nExercise Name: Tricep Press Down\r\n\r\nMuscle Group:\r\n\r\nPrimary: Triceps');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sessionId`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`trainerId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`workoutId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `sessionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `trainerId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `workout`
--
ALTER TABLE `workout`
  MODIFY `workoutId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

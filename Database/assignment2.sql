-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2023 at 02:52 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL,
  `products` text NOT NULL,
  `quantities` int(11) NOT NULL,
  `user` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartid`, `products`, `quantities`, `user`) VALUES
(1, 'iPhone 14', 2, 'Jigar'),
(2, 'iPhone 12', 1, 'JK');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentid` int(11) NOT NULL,
  `product` text NOT NULL,
  `user` text NOT NULL,
  `rating` int(11) NOT NULL,
  `image` text NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentid`, `product`, `user`, `rating`, `image`, `text`) VALUES
(1, 'iPhone 14', 'Jigar', 5, 'path/image1', 'Hello, This is the best product for me.'),
(2, 'iPhone 12', 'JK', 4, 'comments/path/image2', 'This is best');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `orderid` int(11) NOT NULL,
  `invoiceno` int(11) NOT NULL,
  `image` text NOT NULL,
  `product` text NOT NULL,
  `quntity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `ratting` int(11) NOT NULL,
  `payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderid`, `invoiceno`, `image`, `product`, `quntity`, `price`, `tax`, `ratting`, `payment`) VALUES
(1, 121212, 'path/order/image1', 'iphone 14', 1, 100, 13, 5, 1),
(2, 222222, 'order/path/image2', 'iPhone 12', 2, 500, 13, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productid` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `pricing` int(11) NOT NULL,
  `shipping cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productid`, `description`, `image`, `pricing`, `shipping cost`) VALUES
(1, 'iPhone 14', 'product-1_1.png', 549, 20),
(2, 'iPhone X', 'product-2_1.png', 899, 20),
(3, 'Samsung Galaxy S22', 'product-3_1.png', 399, 20),
(4, 'OPPOF19', 'product-4_1.png', 280, 20),
(5, 'Huawei P30', 'product-5_1.png', 499, 20),
(6, 'MacBook Pro\r\n', 'product-6_1.png', 1749, 20),
(7, 'Samsung Galaxy Book', 'product-7_1.png', 1499, 20),
(8, 'Microsoft Surface Laptop 4', 'product-8_1.png', 1499, 20),
(9, 'Infinix INBOOK', 'product-9_1.png', 1099, 20),
(10, 'HP Pavilion 15-DK1056WM', 'product-10_1.png', 1099, 20),
(11, 'perfume Oil', 'product-11_1.png', 15, 20),
(12, 'Brown Perfume', 'product-12_1.png', 40, 10),
(13, 'Fog Scent Xpressio Perfume', 'product-13_1.png', 15, 10),
(14, 'Non-Alcoholic Concentrated Perfume Oil', 'product-14_1.png', 120, 10),
(15, 'Eau De Perfume Spray\r\n', 'product-15_1.png', 30, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `username` varchar(50) NOT NULL,
  `purchase history` text NOT NULL,
  `shipping address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `password`, `username`, `purchase history`, `shipping address`) VALUES
(1, 'jigargangani@gmail.com', 'abc@1234', 'jigar123', '2', '204 river road east'),
(2, 'tasvir_keyur@gmail.com', 'abc@1234', 'tasvir_keyur', 'This is best purchase history', '222 River Road');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartid`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentid`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

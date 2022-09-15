-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2022 at 05:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_petsociety`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `item_status` int(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `noItem` int(10) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `product_id`, `item_status`, `user_id`, `noItem`, `totalAmount`) VALUES
(4, 4, 0, 1, 1, '2400.00');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `cat_CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `cat_CreatedAt`) VALUES
(1, 'Cat Food', '2022-08-07 11:07:33'),
(2, 'Accessories', '2022-08-07 11:20:46'),
(3, 'DOG', '2022-08-07 12:37:57'),
(4, 'CAT', '2022-08-07 12:47:41'),
(5, 'Dog food', '2022-08-07 15:40:19');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `profilePic` varchar(225) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birthdate` date NOT NULL,
  `addresss` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `user_id`, `email`, `contact`, `profilePic`, `firstname`, `middlename`, `lastname`, `gender`, `birthdate`, `addresss`) VALUES
(1, 1, 'lumangyao112@gmail.com', '09750791317', 'profiles/pets.png', 'John', 'Labarino', 'Lumangyao', 'Male', '2000-11-14', 'test 123 blg'),
(2, 6, 'test@gmail.com', '09750791317', 'profiles/brook.png', 'John', 'Labarino', 'Lumangyao', 'Male', '2001-11-13', 'Tisa Cebu City');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `orderItem_id` int(11) NOT NULL,
  `itemReference` varchar(30) NOT NULL,
  `product_id` int(11) NOT NULL,
  `orderItemAmount` decimal(11,2) NOT NULL,
  `orderItemNo` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`orderItem_id`, `itemReference`, `product_id`, `orderItemAmount`, `orderItemNo`, `order_id`) VALUES
(1, 'PTR-221109015502-310', 1, '500.00', 5, 1),
(2, 'PTR-221109015502-310', 2, '15000.00', 3, 1),
(3, 'PTR-221109015321-553', 3, '155.00', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `totalAmount` decimal(11,2) NOT NULL,
  `paid` decimal(11,2) NOT NULL,
  `isHalf` int(1) NOT NULL,
  `referenceNo` varchar(20) NOT NULL,
  `orderStatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `createAt`, `updateAt`, `user_id`, `totalAmount`, `paid`, `isHalf`, `referenceNo`, `orderStatus`) VALUES
(1, '2022-09-11 11:02:55', '2022-09-11 11:02:55', 1, '15500.00', '15500.00', 0, 'PTR-221109015502-310', '1'),
(2, '2022-09-11 11:21:53', '2022-09-11 11:21:53', 1, '155.00', '77.50', 1, 'PTR-221109015321-553', '1');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `productImage` varchar(225) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `category_id` int(10) NOT NULL,
  `productDescription` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` varchar(30) NOT NULL,
  `stock` int(10) NOT NULL,
  `isAvailable` int(1) NOT NULL,
  `product_del` int(1) NOT NULL,
  `p_createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `p_updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `shop_id`, `productImage`, `productName`, `category_id`, `productDescription`, `price`, `unit`, `stock`, `isAvailable`, `product_del`, `p_createdAt`, `p_updateAt`) VALUES
(1, 1, 'products/ruffwear-patroller-leash-dog-leash.jpg', 'Dog Leash', 2, 'Dog Leash for dog', '100.00', 'pcs', 0, 1, 0, '2022-09-06 00:59:41', '2022-09-11 11:02:55'),
(2, 2, 'products/picture-of-shih-tzu-dog.jpg', 'Shitzu', 3, 'Shitdog complet vaccine', '5000.00', 'pcs', -2, 1, 0, '2022-09-11 01:52:33', '2022-09-11 11:02:55'),
(3, 1, 'products/pedigree-puppy-chicken-liver-egg-loaf-flavor-with-vegetables-80g-dog-wet-food.jpg', 'Pedigree Puppy', 5, 'Pedigree puppy dog food', '155.00', 'kg', 3, 1, 0, '2022-09-11 03:34:07', '2022-09-11 15:04:38'),
(4, 2, 'products/How-to-Care-for-Siamese-Kittens-min.jpg', 'Siamese Kitten', 4, 'Siamese kitten', '2400.00', 'pcs', 3, 1, 0, '2022-09-11 03:35:46', '2022-09-11 03:35:46');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `shop_id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `shopName` varchar(50) NOT NULL,
  `logo` varchar(250) NOT NULL,
  `shopEmail` varchar(50) NOT NULL,
  `shopDescription` varchar(100) NOT NULL,
  `ownerFirstName` varchar(30) NOT NULL,
  `ownerMiddleName` varchar(30) NOT NULL,
  `ownerLastName` varchar(30) NOT NULL,
  `shopAddress` varchar(100) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `subscription_id` int(2) NOT NULL,
  `shopContact` varchar(12) NOT NULL,
  `subExp` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `user_id`, `shopName`, `logo`, `shopEmail`, `shopDescription`, `ownerFirstName`, `ownerMiddleName`, `ownerLastName`, `shopAddress`, `updateAt`, `subscription_id`, `shopContact`, `subExp`) VALUES
(1, 13, 'Pet Shop Lodi', 'shops/pet-shop-logo-design-template-store-with-goods-vector-32216739.jpg', 'petshop123@gmail.com', 'Shop Bla Bla', 'April ', 'Diez', ' Grace', 'Tres De Abril Cebu City', '2022-09-06 00:49:33', 0, '09750791317', NULL),
(2, 14, 'testshop hapi', 'shops/shop-store-icon-vector-30737083.jpg', 'testshop@gmail.com', 'Pet shop whowowo', 'Hanna', 'test', 'Mendola', 'blg cebu city', '2022-09-11 01:50:23', 0, '09750791317', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shoporder`
--

CREATE TABLE `shoporder` (
  `shoporder_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `shopReference` varchar(30) NOT NULL,
  `shop_order_status` varchar(20) NOT NULL,
  `shoporderpaid` decimal(11,2) NOT NULL,
  `shopordertotal` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shoporder`
--

INSERT INTO `shoporder` (`shoporder_id`, `order_id`, `shop_id`, `shopReference`, `shop_order_status`, `shoporderpaid`, `shopordertotal`) VALUES
(1, 1, 1, 'PTR-221109015502-310', '3', '500.00', '500.00'),
(2, 1, 2, 'PTR-221109015502-310', '1', '15000.00', '15000.00'),
(3, 2, 1, 'PTR-221109015321-553', '0', '77.50', '155.00');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `subscription_id` int(11) NOT NULL,
  `subscriptionName` varchar(20) NOT NULL,
  `noMonths` int(12) NOT NULL,
  `isActive` int(1) NOT NULL,
  `subDescription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`subscription_id`, `subscriptionName`, `noMonths`, `isActive`, `subDescription`) VALUES
(1, 'regular', 1, 1, 'This is regular Subscription'),
(2, 'Premium', 2, 1, 'This is Premium Subscription');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(225) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_roles` int(1) NOT NULL,
  `user_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `createAt`, `user_roles`, `user_status`) VALUES
(1, 'john123', '123', '2022-08-17 22:44:21', 2, 1),
(3, 'testshop', '123', '2022-08-17 22:57:06', 1, 1),
(4, 'testshop3', '123', '2022-08-27 14:24:09', 1, 1),
(5, 'mypetshop', '123', '2022-08-17 22:11:50', 1, 0),
(6, 'Qwer123', '123', '2022-08-27 13:56:30', 2, 1),
(7, 'undefined', 'undefined', '2022-08-25 16:39:57', 1, 0),
(8, 'undefined', 'undefined', '2022-08-25 16:41:01', 1, 0),
(9, 'undefined', 'undefined', '2022-08-25 16:42:08', 1, 0),
(10, 'undefined', 'undefined', '2022-08-25 16:42:52', 1, 0),
(11, 'Joedan123', '123', '2022-08-25 16:50:17', 1, 0),
(12, 'admin', '123', '2022-08-27 13:11:49', 0, 1),
(13, 'petshop123', '123', '2022-09-06 00:51:51', 1, 1),
(14, 'testshop2', '123', '2022-09-11 01:51:01', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`orderItem_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `shoporder`
--
ALTER TABLE `shoporder`
  ADD PRIMARY KEY (`shoporder_id`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `orderItem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shoporder`
--
ALTER TABLE `shoporder`
  MODIFY `shoporder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

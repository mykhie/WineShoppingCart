CREATE DATABASE  IF NOT EXISTS `cart` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cart`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: cart
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.29-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_customers`
--

DROP TABLE IF EXISTS `cart_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullnames` varchar(45) DEFAULT NULL,
  `idno` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `orderNumber` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_customers`
--

LOCK TABLES `cart_customers` WRITE;
/*!40000 ALTER TABLE `cart_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_order`
--

DROP TABLE IF EXISTS `cart_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(45) DEFAULT NULL,
  `itemId` int(45) DEFAULT NULL,
  `price` decimal(45,0) DEFAULT NULL,
  `qty` int(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  `customerId` int(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `total` decimal(45,0) DEFAULT NULL,
  `productName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Product_id_idx` (`itemId`),
  KEY `Customer_Id_idx` (`customerId`),
  CONSTRAINT `Customer_Id` FOREIGN KEY (`customerId`) REFERENCES `cart_customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Product_id` FOREIGN KEY (`itemId`) REFERENCES `cart_products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_order`
--

LOCK TABLES `cart_order` WRITE;
/*!40000 ALTER TABLE `cart_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) DEFAULT NULL,
  `price` decimal(45,0) DEFAULT NULL,
  `quantity` int(45) DEFAULT NULL,
  `status` int(45) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `createdBy` int(45) DEFAULT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `case` int(45) DEFAULT NULL,
  `casePrice` int(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `vintage` varchar(45) DEFAULT NULL,
  `sparkling` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
INSERT INTO `cart_products` VALUES (1,'Pinot noir',19,12,1,'0000-00-00 00:00:00',1,'images/09riesling.png',12,192,'white','11','1'),(2,'riesling',18,13,1,'0000-00-00 00:00:00',1,'images/09riesling.png',12,188,'red','2','0'),(3,'riesling small',24,16,1,'0000-00-00 00:00:00',1,'images/09riesling_v.png',12,211,'white','12','1'),(4,'Breidecker small',42,15,1,'0000-00-00 00:00:00',1,'images/Breidecker_small.jpg',12,195,'red','14','1'),(5,'chardonnay',91,14,1,'0000-00-00 00:00:00',1,'images/chardonnay_v_1.png',12,201,'white','5','1'),(6,'Hukapapa',18,13,1,'0000-00-00 00:00:00',1,'images/Hukapapa_v.png',12,197,'red','15','1'),(7,'Hunters Gewurztraminer',19,12,1,'0000-00-00 00:00:00',1,'images/Hunters_Gewurztraminer_NV_-_webv.png',12,209,'red','7','1'),(8,'Hunters Late Harvest Sauvignon Blanc',18,15,1,'0000-00-00 00:00:00',1,'images/Hunters_Late_Harvest_Sauvignon-Blanc_NV__webv.png',12,201,'white','8','1'),(9,'hunters mirumiru',18,14,1,'0000-00-00 00:00:00',1,'images/hunters_mirumiru_non_vintage_PNG_v3.png',12,201,'red','10','0'),(10,'pinotnoir small',18,13,1,'0000-00-00 00:00:00',1,'images/pinotnoir_small_v_1.png',12,191,'white','8','0'),(11,'Hunters Late Harvest Sauvignon Blanc',18,15,1,'0000-00-00 00:00:00',1,'images/chardonnay_v_1.png',12,190,'white','11','0'),(12,'Rose',18,15,1,'0000-00-00 00:00:00',1,'images/Hunters_Late_Harvest_Sauvignon-Blanc_NV__webv.png',12,191,'white','5','0');
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-13 11:23:45

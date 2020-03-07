CREATE TABLE `test` (
  `id` int NOT NULL UNIQUE AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `test` (id, name) values
(1, 'pirmas'),
(2, 'antras'),
(3, 'trecias');
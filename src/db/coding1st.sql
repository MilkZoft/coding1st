-- phpMyAdmin SQL Dump
-- version 4.5.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2016 at 07:36 AM
-- Server version: 5.7.10
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coding1st`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` text NOT NULL,
  `codes` text NOT NULL,
  `tags` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `estatus` varchar(25) NOT NULL DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `excerpt`, `content`, `codes`, `tags`, `createdAt`, `language`, `estatus`) VALUES
(1, 'Test 1', 'test-1', '', '<p>Test 1</p>', '', '', '2016-02-08 13:55:59', 'en', 'published');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `network` varchar(25) NOT NULL DEFAULT 'twitter',
  `networkId` varchar(25) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `suscribed` tinyint(1) NOT NULL DEFAULT '0',
  `privilege` varchar(5) NOT NULL DEFAULT 'user',
  `estatus` varchar(25) NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `network`, `networkId`, `username`, `password`, `email`, `avatar`, `suscribed`, `privilege`, `estatus`) VALUES
(1, 'twitter', '461804603', 'codejobs', '', 'azapedia@gmail.com', 'https://pbs.twimg.com/profile_images/603310588190658560/6jLlKtr1.png', 0, 'god', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `vendomatic`
--

CREATE TABLE `vendomatic` (
  `id` int(11) UNSIGNED NOT NULL,
  `keyName` varchar(255) DEFAULT NULL,
  `keyValue` text NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendomatic`
--

INSERT INTO `vendomatic` (`id`, `keyName`, `keyValue`, `language`) VALUES
(1, 'site.language', 'en', 'en'),
(2, 'site.title', 'Coding1st - English', 'en'),
(3, 'site.meta.abstract', 'Learn to code', 'en'),
(4, 'site.meta.description', 'Learn to code', 'en'),
(5, 'site.meta.keywords', 'HTML5, JavaScript, Node.js', 'en'),
(6, 'site.language', 'es', 'es'),
(7, 'site.title', 'Coding1st - Español', 'es'),
(8, 'site.meta.abstract', 'Aprende a programar', 'es'),
(9, 'site.meta.description', 'Aprende a programar', 'es'),
(10, 'site.meta.keywords', 'HTML5, JavaScript, Node.js', 'es'),
(11, 'dashboard.forms.fields.activeComments', 'Active Comments?', 'en'),
(12, 'dashboard.forms.fields.author', 'Author', 'en'),
(13, 'dashboard.forms.fields.codes', 'Codes', 'en'),
(14, 'dashboard.forms.fields.content', 'Content', 'en'),
(15, 'dashboard.forms.fields.excerpt', 'Excerpt', 'en'),
(16, 'dashboard.forms.fields.language', 'Language', 'en'),
(17, 'dashboard.forms.fields.publish', 'Publish', 'en'),
(18, 'dashboard.forms.fields.selects.decision', 'yes:Yes|no:No', 'en'),
(19, 'dashboard.forms.fields.selects.languages', 'en:English|es:Spanish', 'en'),
(20, 'dashboard.forms.fields.selects.status', 'draft:Draft|published:Published', 'en'),
(21, 'dashboard.forms.fields.slug', 'Friendly URL', 'en'),
(22, 'dashboard.forms.fields.status', 'Status', 'en'),
(23, 'dashboard.forms.fields.tags', 'Tags', 'en'),
(24, 'dashboard.forms.fields.title', 'Title', 'en'),
(25, 'dashboard.modules.dashboard.name', 'Dashboard', 'en'),
(26, 'dashboard.modules.ads.name', 'Ads', 'en'),
(27, 'dashboard.modules.ads.action', 'Add new ad', 'en'),
(28, 'dashboard.modules.blog.name', 'Blog', 'en'),
(29, 'dashboard.modules.blog.action', 'Add new post', 'en'),
(30, 'dashboard.modules.config.name', 'Configuration', 'en'),
(31, 'dashboard.modules.feedback.name', 'Feedback', 'en'),
(32, 'dashboard.modules.pages.name', 'Pages', 'en'),
(33, 'dashboard.modules.pages.action', 'Add new Page', 'en'),
(34, 'dashboard.modules.polls.name', 'Polls', 'en'),
(35, 'dashboard.modules.polls.action', 'Add new Poll', 'en'),
(36, 'dashboard.modules.users.name', 'Users', 'en'),
(37, 'dashboard.modules.polls.action', 'Add new User', 'en'),
(38, 'dashboard.modules.logout.name', 'Logout', 'en'),
(39, 'users.register.success', 'Your account have been created correctly, enjoy our site!', 'en'),
(40, 'users.register.fail', 'There was a problem trying to create your account, please try again.', 'en'),
(41, 'db.errors.exists:username', 'The username already exists', 'en'),
(42, 'db.errors.exists:email', 'The email is already registered', 'en'),
(43, 'db.errors.exists:social:networkId', 'This social user already exists', 'en'),
(44, 'db.errors.invalid:email', 'Invalid Email', 'en'),
(45, 'db.errors.invalid:number:subscribed', 'Subscribed should be 1 or 0', 'en'),
(46, 'db.errors.undefined:avatar', 'Avatar is undefined', 'en'),
(47, 'db.errors.undefined:networkId', 'NetworkId is undefined', 'en'),
(48, 'db.errors.undefined:username', 'Username is undefined', 'en'),
(49, 'db.success.inserted:website:username', 'User created successfuly', 'en'),
(50, 'db.success.inserted:social:username', 'Social User created successfuly', 'en'),
(51, 'dashboard.forms.fields.activeComments', '¿Activar Comentarios?', 'es'),
(52, 'dashboard.forms.fields.author', 'Autor', 'es'),
(53, 'dashboard.forms.fields.codes', 'Códigos', 'es'),
(54, 'dashboard.forms.fields.content', 'Contenido', 'es'),
(55, 'dashboard.forms.fields.excerpt', 'Extracto', 'es'),
(56, 'dashboard.forms.fields.language', 'Idioma', 'es'),
(57, 'dashboard.forms.fields.publish', 'Publicar', 'es'),
(58, 'dashboard.forms.fields.selects.decision', 'yes:Si|no:No', 'es'),
(59, 'dashboard.forms.fields.selects.languages', 'en:Inglés|es:Español', 'es'),
(60, 'dashboard.forms.fields.selects.status', 'draft:Borrador|published:Publicado', 'es'),
(61, 'dashboard.forms.fields.slug', 'URL Amigable', 'es'),
(62, 'dashboard.forms.fields.status', 'Estatus', 'es'),
(63, 'dashboard.forms.fields.tags', 'Etiquetas', 'es'),
(64, 'dashboard.forms.fields.title', 'Título', 'es'),
(65, 'dashboard.modules.ads.action', 'Agregar nuevo anuncio', 'es'),
(66, 'dashboard.modules.ads.name', 'Anuncios', 'es'),
(67, 'dashboard.modules.blog.action', 'Agregar nueva publicación', 'es'),
(68, 'dashboard.modules.blog.name', 'Blog', 'es'),
(69, 'dashboard.modules.config.name', 'Configuración', 'es'),
(70, 'dashboard.modules.dashboard.name', 'Dashboard', 'es'),
(71, 'dashboard.modules.feedback.name', 'Contacto', 'es'),
(72, 'dashboard.modules.logout.name', 'Desconectar', 'es'),
(73, 'dashboard.modules.pages.action', 'Agregar nueva Página', 'es'),
(74, 'dashboard.modules.pages.name', 'Páginas', 'es'),
(75, 'dashboard.modules.polls.action', 'Agregar nueva Encuesta', 'es'),
(76, 'dashboard.modules.polls.name', 'Encuestas', 'es'),
(77, 'dashboard.modules.users.name', 'Usuarios', 'es'),
(78, 'db.errors.exists:email', 'El correo electrónico ya está registrado', 'es'),
(79, 'db.errors.exists:social:networkId', 'Este usuario social ya existe', 'es'),
(80, 'db.errors.exists:username', 'El usuario ya existe', 'es'),
(81, 'db.errors.invalid:email', 'Email Inválido', 'es'),
(82, 'db.errors.invalid:number:subscribed', 'El campo Subscribed debe ser 1 o 0', 'es'),
(83, 'db.errors.undefined:avatar', 'El avatar no esta definido', 'es'),
(84, 'db.errors.undefined:networkId', 'El NetworkId no está definido', 'es'),
(85, 'db.errors.undefined:username', 'El Usuario no está definido', 'es'),
(86, 'db.success.inserted:social:username', 'Usuario social creado exitosamente', 'es'),
(87, 'db.success.inserted:website:username', 'Usuario creado exitosamente', 'es'),
(88, 'users.register.fail', 'Hubo un error al intentar crear tu cuenta, por favor intenta más tarde.', 'es'),
(89, 'users.register.success', '¡Tu cuenta ha sido creada exitosamente, disfruta nuestro sitio!', 'es');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendomatic`
--
ALTER TABLE `vendomatic`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vendomatic`
--
ALTER TABLE `vendomatic`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 27, 2016 at 08:08 PM
-- Server version: 10.1.12-MariaDB
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
        IF _network = 'website' THEN
        SELECT id, username, email, avatar, privilege FROM users
        WHERE username = _username
            AND password = _password
            AND estatus = 'active';
    ELSE
        SELECT id, networkId, network, username, email, avatar, privilege FROM users
        WHERE username = _username
            AND networkId = _networkId
            AND network = _network
            AND estatus = 'active';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserPrivilege` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
        IF _network = 'website' THEN
        SELECT privilege FROM users
        WHERE username = _username
            AND password = _password
            AND estatus = 'active';
    ELSE
        SELECT privilege FROM users
        WHERE username = _username
            AND networkId = _networkId
            AND network = _network
            AND estatus = 'active';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getVendoContent` (IN `_language` VARCHAR(2))  BEGIN
    SELECT keyName, keyValue FROM vendomatic
        WHERE language = _language
        ORDER BY keyName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `savePost` (IN `_title` VARCHAR(255), IN `_slug` VARCHAR(255), IN `_excerpt` TEXT, IN `_content` TEXT, IN `_codes` TEXT, IN `_tags` VARCHAR(255), IN `_author` VARCHAR(50), IN `_createdAt` DATETIME, IN `_day` VARCHAR(2), IN `_month` VARCHAR(2), IN `_year` VARCHAR(2), IN `_language` VARCHAR(2), IN `_activeComments` INT, IN `_estatus` VARCHAR(25))  BEGIN
    DECLARE error VARCHAR(255);
    DECLARE success VARCHAR(255);

    IF (_title <> 'undefined' AND _title <> '') THEN
        IF (_slug <> 'undefined' AND _slug <> '') THEN
            IF (_excerpt <> 'undefined' AND _excerpt <> '') THEN
                IF (_content <> 'undefined' AND _content <> '') THEN
                    IF (SELECT EXISTS (SELECT 1 FROM blog WHERE slug = _slug AND day = _day AND month = _month AND year = _year)) THEN
                        SET error = 'exists:post';
                        SELECT error;
                    ELSE
                        INSERT INTO blog (
                            title,
                            slug,
                            excerpt,
                            content,
                            codes,
                            tags,
                            author,
                            createdAt,
                            day,
                            month,
                            year,
                            language,
                            activeComments,
                            estatus
                        ) VALUES (
                            _title,
                            _slug,
                            _excerpt,
                            _content,
                            _codes,
                            _tags,
                            _author,
                            _createdAt,
                            _day,
                            _month,
                            _year,
                            _language,
                            _activeComments,
                            _estatus
                        );

                        SET success = 'inserted:post';
                        SELECT success;
                    END IF;
                ELSE
                    SET error = 'undefined:content';
                    SELECT error;
                END IF;
            ELSE
                SET error = 'undefined:excerpt';
                SELECT error;
            END IF;
        ELSE
            SET error = 'undefined:slug';
            SELECT error;
        END IF;
    ELSE
        SET error = 'undefined:title';
        SELECT error;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40), IN `_email` VARCHAR(150), IN `_avatar` VARCHAR(255), IN `_suscribed` TINYINT(1))  BEGIN
    DECLARE error VARCHAR(255);
    DECLARE success VARCHAR(255);

        IF _network = 'website' THEN
        IF (_username <> 'undefined' AND _username <> '') THEN
            IF (_password <> 'undefined' AND _password <> '') THEN
                IF (_email <> 'undefined' AND _email <> '') THEN
                    IF (_suscribed >= 0) THEN
                        IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
                            SET error = 'exists:username';
                            SELECT error;
                        ELSE
                            IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                                SET error = 'exists:email';
                                SELECT error;
                            ELSE
                                IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                                    SET error = 'exists:social:networkId';
                                    SELECT error;
                                ELSE
                                    INSERT INTO users (
                                        network,
                                        username,
                                        password,
                                        email,
                                        avatar,
                                        subscribed
                                    ) VALUES (
                                        _network,
                                        _username,
                                        _password,
                                        _email,
                                        '/images/users/default.png',
                                        _suscribed
                                    );

                                    SET success = 'inserted:website:user';
                                    SELECT success;
                                END IF;
                            END IF;
                        END IF;
                    ELSE
                        SET error = 'invalid:number:suscribed';
                        SELECT error;
                    END IF;
                ELSE
                    SET error = 'invalid:email';
                    SELECT error;
                END IF;
            ELSE
                SET error = 'undefined:password';
                SELECT error;
            END IF;
        ELSE
            SET error = 'undefined:username';
            SELECT error;
        END IF;
    ELSE
        IF (_username <> 'undefined' AND _username <> '') THEN
            IF (_networkId <> 'undefined' AND _networkId <> '') THEN
                IF (_email <> 'undefined' AND _email <> '') THEN
                    IF (_avatar <> 'undefined' AND _avatar <> '') THEN
                        IF (_suscribed >= 0) THEN
                            IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
                                SET error = 'exists:username';
                                SELECT error;
                            ELSE
                                IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                                    SET error = 'exists:email';
                                    SELECT error;
                                ELSE
                                    IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                                        SET error = 'exists:social:networkId';
                                        SELECT error;
                                    ELSE
                                        INSERT INTO users (
                                            networkId,
                                            network,
                                            username,
                                            email,
                                            avatar,
                                            subscribed
                                        ) VALUES (
                                            _networkId,
                                            _network,
                                            _username,
                                            _email,
                                            _avatar,
                                            _suscribed
                                        );

                                        SET success = 'inserted:social:username';
                                        SELECT success;
                                    END IF;
                                END IF;
                            END IF;
                        ELSE
                            SET error = 'invalid:number:subscribed';
                            SELECT error;
                        END IF;
                    ELSE
                        SET error = 'undefined:avatar';
                        SELECT error;
                    END IF;
                ELSE
                    SET error = 'invalid:email';
                    SELECT error;
                END IF;
            ELSE
                SET error = 'undefined:networkId';
                SELECT error;
            END IF;
        ELSE
            SET error = 'undefined:username';
            SELECT error;
        END IF;
    END IF;
END$$

DELIMITER ;

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
  `author` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `day` varchar(2) NOT NULL,
  `month` varchar(2) NOT NULL,
  `year` varchar(2) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `activeComments` tinyint(1) NOT NULL DEFAULT '1',
  `estatus` varchar(25) NOT NULL DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `excerpt`, `content`, `codes`, `tags`, `author`, `createdAt`, `day`, `month`, `year`, `language`, `activeComments`, `estatus`) VALUES
(1, 'Tet', 'tet', '<p>sdadad</p>\r\n', '<p>asdadad</p>\r\n', '', 'Hola', 'codejobs', '2016-02-27 00:52:58', '27', '2', '20', 'en', 0, 'draft');

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
(89, 'users.register.success', '¡Tu cuenta ha sido creada exitosamente, disfruta nuestro sitio!', 'es'),
(90, 'dashboard.modules.blog.messages.success', 'The post was saved correctly', 'en'),
(91, 'dashboard.modules.blog.messages.add.success', 'The post was created correctly', 'en'),
(92, 'dashboard.modules.blog.messages.add.fail', 'There was a problem trying to create the post', 'en'),
(93, 'dashboard.modules.blog.messages.add.success', 'La publicación fue creada exitosamente', 'es'),
(94, 'dashboard.modules.blog.messages.add.fail', 'Hubo un problema al intentar crear la publicación', 'es'),
(95, 'dashboard.modules.blog.messages.add.exists', 'The post already exists', 'en'),
(96, 'dashboard.modules.blog.messages.add.exists', 'La publicación ya existe', 'es'),
(97, 'dashboard.modules.blog.messages.add.empty', 'The field ${input} cannot be empty', 'en'),
(98, 'dashboard.modules.blog.messages.add.empty', 'El campo ${input} no puede estar vacío', 'es');

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

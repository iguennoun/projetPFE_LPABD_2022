-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 19 oct. 2022 à 00:19
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gestion_rh_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `action`
--

DROP TABLE IF EXISTS `action`;
CREATE TABLE IF NOT EXISTS `action` (
  `idAct` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `description` varchar(254) DEFAULT NULL,
  `dateAct` date NOT NULL,
  PRIMARY KEY (`idAct`),
  KEY `FK_association1` (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `auth`
--

DROP TABLE IF EXISTS `auth`;
CREATE TABLE IF NOT EXISTS `auth` (
  `cni` varchar(12) NOT NULL,
  `numSession` bigint(20) NOT NULL,
  `passwordHash` varchar(254) NOT NULL,
  `habilitation` int(11) DEFAULT NULL,
  PRIMARY KEY (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `batiment`
--

DROP TABLE IF EXISTS `batiment`;
CREATE TABLE IF NOT EXISTS `batiment` (
  `codeLocal` int(11) NOT NULL AUTO_INCREMENT,
  `libelleBFr` varchar(254) NOT NULL,
  `libelleBAr` varchar(254) DEFAULT NULL,
  `adresse` text,
  `coordGPS` varchar(254) DEFAULT NULL,
  `codeV` int(11) NOT NULL,
  PRIMARY KEY (`codeLocal`),
  KEY `FK_association5` (`codeV`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `batiment`
--

INSERT INTO `batiment` (`codeLocal`, `libelleBFr`, `libelleBAr`, `adresse`, `coordGPS`, `codeV`) VALUES
(1, 'Bâtiment Targa', 'مبنى تاركة', NULL, NULL, 192),
(2, 'Bâtiment Allal El Fassi', 'مبنى علال الفاسي', NULL, NULL, 192),
(3, 'Bâtiment Gueliz', 'مبنى جليز', NULL, NULL, 192),
(4, 'Centre Régional d\'Investissement - Marrakech', 'المركز الجهوي للاستثمار - مراكش', NULL, NULL, 192),
(5, 'Bâtiment El Kelaa Des Sraghnas', 'مبنى قلعة السراغنة', NULL, NULL, 107),
(6, 'Bâtiment Benguerir', 'مبنى ابن جرير', NULL, NULL, 51),
(7, 'Bâtiment Ait ourir', 'مبنى أيت أورير', NULL, NULL, 25),
(8, 'Bâtiment Tahanaout', 'مبنى تحناوت', NULL, NULL, 295),
(9, 'Bâtiment Chichaoua', 'مبنى شيشاوة', NULL, NULL, 86),
(10, 'Bâtiment Imintanout', 'مبنى إيمنتانوت', NULL, NULL, 143),
(11, 'Bâtiment Essaouira', 'مبنى الصويرة', NULL, NULL, 115),
(12, 'Bâtiment assiette', 'مبنى الوعاء الضريبي', NULL, NULL, 248),
(13, 'Bâtiment de la RAF et Enr Safi', 'مبنى قباضة الادارة الجبائية', NULL, NULL, 248),
(14, 'Bâtiment Youssoufia', 'مبنى اليوسفية', NULL, NULL, 337),
(15, 'Bâtiment Echemmaia', 'مبنى الشماعية', NULL, NULL, 99),
(16, 'Centre Régional d\'Investissement - Safi', 'المركز الجهوي للاستثمار - أسفي', NULL, NULL, 248),
(17, 'Centre Régional de formation', 'المركز الجهوي للتكوين', NULL, NULL, 192);

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
CREATE TABLE IF NOT EXISTS `fonction` (
  `idF` int(11) NOT NULL AUTO_INCREMENT,
  `libelleF` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`idF`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`idF`, `libelleF`) VALUES
(1, 'DIRECTEUR REGIONAL'),
(2, 'SECRETAIRE'),
(3, 'INSPECTEUR AUDITEUR'),
(4, 'Chargé des affaires judiciaires'),
(5, 'Chargé d\'Accueil et de Coordination'),
(6, 'CHARGE DES STATISTIQUES'),
(7, 'Chargé Emiss, Titre Annul, Compt & Staq'),
(8, 'CHEF DE SERVICE REGIONAL'),
(9, 'CHEF DE SERVICE PROVINCIAL'),
(10, 'CHEF DE SUBDIVISION'),
(11, 'CHEF DE BRIGADE'),
(12, 'CHEF DE BUREAU'),
(13, 'CHEF DE SECTEUR'),
(15, 'CHEF DE SECTEUR POLYVALENT'),
(16, 'CHEF DE SECTION'),
(17, 'Chargé de la Fiscalité des Grandes Entreprises'),
(18, 'Chargé de la Fiscalité des Personnes Morales'),
(19, 'Chargé de la fiscalité des professionnels'),
(20, 'Chargé de la Fiscalité des Personnes Physiques'),
(21, 'Chargé de la Fiscalité des Particuliers'),
(22, 'Chargé des Exonérations et du Remboursement'),
(23, 'Chargé de l\'IR/SALAIRES'),
(24, 'Chargé de la Restitution IR/SOURCE'),
(25, 'Chargé du Traitement des dossiers du Logement Social et Contribution TVA'),
(26, 'Chargé du Suivi des Recours devant les Commissions Locales de Taxation'),
(27, 'RAPPORTEUR CLT'),
(28, 'VERIFICATEUR'),
(29, 'RECEVEUR ORDONNATEUR'),
(30, 'RECEVEUR DE L\'ADMINISTRATION FISCALE'),
(31, 'FONDE DE POUVOIR'),
(32, 'A.N.E.T'),
(33, 'Chargé de la comptabilité'),
(34, 'Chargé du Recouvrement Forcé'),
(35, 'Chargé de la Liquidation des Actes'),
(36, 'Chargé de la Surveillance'),
(37, 'Chargé du Contrôle de l\'IR/PF'),
(38, 'Chargé du Contrôle des Insuffisances des Prix'),
(39, 'Chargé des RH'),
(40, 'Chargé du Budget et des Equipements'),
(41, 'Technicien en exploitation'),
(42, 'Chargé de la formation'),
(43, 'Chargé des Archives'),
(44, 'Agent de Service'),
(45, 'CHAUFEUR'),
(49, 'Test'),
(52, 'F22');

-- --------------------------------------------------------

--
-- Structure de la table `grade`
--

DROP TABLE IF EXISTS `grade`;
CREATE TABLE IF NOT EXISTS `grade` (
  `codeG` int(11) NOT NULL AUTO_INCREMENT,
  `libelleGFr` varchar(254) DEFAULT NULL,
  `libelleGAr` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`codeG`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `grade`
--

INSERT INTO `grade` (`codeG`, `libelleGFr`, `libelleGAr`) VALUES
(1, 'INGENIEUR EN CHEF GRADE PRINCIPAL', 'مهندس رئيس من درجة ممتاز'),
(2, 'INGENIEUR EN CHEF 1ER GRADE', 'مهندس رئيس من الدرجة الأولى'),
(3, 'INGENIEUR D\'ETAT GRADE PRINCIPAL', 'مهندس دولة من الدرجة الممتازة'),
(4, 'INGENIEUR D\'ETAT 1ER GRADE', 'مهندس دولة من الدرجة الأولى'),
(5, 'ADMINISTRATEUR 1ER GRADE', 'متصرف من الدرجة الأولى'),
(6, 'ADMINISTRATEUR 2EME GRADE', 'متصرف من الدرجة الثانية'),
(7, 'ADMINISTRATEUR 3EME GRADE', 'متصرف من الدرجة الثالثة'),
(8, 'TECHNICIEN DE 1ER GRADE', 'تقني من الدرجة الأولى'),
(9, 'TECHNICIEN DE 2EME GRADE', 'تقني من الدرجة الثانية'),
(10, 'TECHNICIEN DE 3EME GRADE', 'تقني من الدرجة الثالثة'),
(12, 'ADJOINT TECHNIQUE 2EME GRADE', 'مساعد تقني من الدرجة الثانية'),
(13, 'ADJOINT TECHNIQUE 3EME GRADE', 'مساعد تقني من الدرجة الثالثة'),
(15, 'ADJOINT ADMINISTRATIF 2EME GRADE', 'مساعد إداري من الدرجة الثانية'),
(16, 'ADJOINT ADMINISTRATIF 3EME GRADE', 'مساعد إداري من الدرجة الثالثة'),
(18, 'REDACTEUR 2EME GRADE', 'محرر من الدرجة الثانية'),
(19, 'REDACTEUR 3EME GRADE', 'محرر من الدرجة الثالثة'),
(20, 'COMMISSAIRE JUDICIAIRE DE 2EME GRADE', 'منتدب قضائي من الدرجة الثانية'),
(21, 'PROFESSEUR DU PRIMAIRE 2EME GRADE', 'معلم ابتدائي من الدرجة الثانية');

-- --------------------------------------------------------

--
-- Structure de la table `histodiplome`
--

DROP TABLE IF EXISTS `histodiplome`;
CREATE TABLE IF NOT EXISTS `histodiplome` (
  `idNe` int(11) NOT NULL,
  `codeSpecDip` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `dateObtention` date NOT NULL,
  PRIMARY KEY (`idNe`,`codeSpecDip`,`cni`,`dateObtention`) USING BTREE,
  KEY `FK_association13` (`cni`),
  KEY `FK_specdip` (`codeSpecDip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `histodiplome`
--

INSERT INTO `histodiplome` (`idNe`, `codeSpecDip`, `cni`, `dateObtention`) VALUES
(4, 17, 'EE437330', '2022-08-18');

-- --------------------------------------------------------

--
-- Structure de la table `histofonction`
--

DROP TABLE IF EXISTS `histofonction`;
CREATE TABLE IF NOT EXISTS `histofonction` (
  `idF` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `dateAffect` date NOT NULL,
  PRIMARY KEY (`idF`,`cni`,`dateAffect`),
  KEY `FK_association8` (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `histofonction`
--

INSERT INTO `histofonction` (`idF`, `cni`, `dateAffect`) VALUES
(41, 'EE437330', '2022-08-18');

-- --------------------------------------------------------

--
-- Structure de la table `histograde`
--

DROP TABLE IF EXISTS `histograde`;
CREATE TABLE IF NOT EXISTS `histograde` (
  `codeG` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `datePromo` date NOT NULL,
  PRIMARY KEY (`codeG`,`cni`,`datePromo`),
  KEY `FK_association12` (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `histograde`
--

INSERT INTO `histograde` (`codeG`, `cni`, `datePromo`) VALUES
(9, 'EE437330', '2023-01-01'),
(10, 'EE437330', '2022-08-18'),
(10, 'EE437330', '2029-01-01');

-- --------------------------------------------------------

--
-- Structure de la table `historespous`
--

DROP TABLE IF EXISTS `historespous`;
CREATE TABLE IF NOT EXISTS `historespous` (
  `codeUS` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `dateAffectationRespo` date NOT NULL,
  `dateFinAffectationRespo` date DEFAULT NULL,
  `interim` tinyint(1) DEFAULT NULL,
  `note` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`codeUS`,`cni`,`dateAffectationRespo`),
  KEY `FK_association16` (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `histous`
--

DROP TABLE IF EXISTS `histous`;
CREATE TABLE IF NOT EXISTS `histous` (
  `codeUS` int(11) NOT NULL,
  `cni` varchar(12) NOT NULL,
  `dateAffectation` date NOT NULL,
  `dateFinAffectation` date DEFAULT NULL,
  PRIMARY KEY (`codeUS`,`cni`,`dateAffectation`),
  KEY `FK_association21` (`cni`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `histous`
--

INSERT INTO `histous` (`codeUS`, `cni`, `dateAffectation`, `dateFinAffectation`) VALUES
(11003, 'EE437330', '2015-06-08', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `niveauetu`
--

DROP TABLE IF EXISTS `niveauetu`;
CREATE TABLE IF NOT EXISTS `niveauetu` (
  `idNE` int(11) NOT NULL AUTO_INCREMENT,
  `anneeABac` varchar(254) DEFAULT NULL,
  `titreDip` varchar(254) DEFAULT NULL,
  `niveauDip` int(11) DEFAULT NULL,
  PRIMARY KEY (`idNE`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveauetu`
--

INSERT INTO `niveauetu` (`idNE`, `anneeABac`, `titreDip`, `niveauDip`) VALUES
(1, '-', '_BAC', 3),
(2, 'BAC', 'BAC', 4),
(3, 'BAC + 2', 'BAC plus 2', 5),
(4, 'BAC + 3', 'LICENCE', 6),
(5, 'BAC + 4', 'BAC plus 4', 6),
(6, 'BAC + 5', 'MASTER', 7),
(7, 'BAC + 5', 'DIP ING', 7),
(8, 'BAC + 8', 'DOCTORAT', 8);

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

DROP TABLE IF EXISTS `pays`;
CREATE TABLE IF NOT EXISTS `pays` (
  `codeP` int(11) NOT NULL,
  `isoAlpha2` varchar(254) NOT NULL,
  `isoAlpha3` varchar(254) DEFAULT NULL,
  `nomPFr` varchar(254) NOT NULL,
  `nomPAr` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`codeP`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`codeP`, `isoAlpha2`, `isoAlpha3`, `nomPFr`, `nomPAr`) VALUES
(20, 'AD', 'AND', 'Andorre', 'أندورا'),
(784, 'AE', 'ARE', 'Émirats arabes unis', 'الإمارات العربية المتحدة'),
(4, 'AF', 'AFG', 'Afghanistan', 'أفغانستان'),
(28, 'AG', 'ATG', 'Antigua-et-Barbuda', 'أنتيغوا وباربودا'),
(660, 'AI', 'AIA', 'Anguilla', 'أنغويلا'),
(8, 'AL', 'ALB', 'Albanie', 'ألبانيا'),
(51, 'AM', 'ARM', 'Arménie', 'أرمينيا'),
(24, 'AO', 'AGO', 'Angola', 'أنغولا'),
(10, 'AQ', 'ATA', 'Antarctique', 'القارة القطبية الجنوبية'),
(32, 'AR', 'ARG', 'Argentine', 'الأرجنتين'),
(16, 'AS', 'ASM', 'Samoa américaines', 'ساموا الأمريكية'),
(40, 'AT', 'AUT', 'Autriche', 'النمسا'),
(36, 'AU', 'AUS', 'Australie', 'أستراليا'),
(533, 'AW', 'ABW', 'Aruba', 'أروبا'),
(248, 'AX', 'ALA', 'Åland', 'أولند'),
(31, 'AZ', 'AZE', 'Azerbaïdjan', 'أذربيجان'),
(70, 'BA', 'BIH', 'Bosnie-Herzégovine', 'البوسنة والهرسك'),
(52, 'BB', 'BRB', 'Barbade', 'باربادوس'),
(50, 'BD', 'BGD', 'Bangladesh', 'بنغلاديش'),
(56, 'BE', 'BEL', 'Belgique', 'بلجيكا'),
(854, 'BF', 'BFA', 'Burkina Faso', 'بوركينا فاسو'),
(100, 'BG', 'BGR', 'Bulgarie', 'بلغاريا'),
(48, 'BH', 'BHR', 'Bahreïn', 'البحرين'),
(108, 'BI', 'BDI', 'Burundi', 'بوروندي'),
(204, 'BJ', 'BEN', 'Bénin', 'بنين'),
(652, 'BL', 'BLM', 'Saint-Barthélemy', 'سان بارتليمي'),
(60, 'BM', 'BMU', 'Bermudes', 'برمودا'),
(96, 'BN', 'BRN', 'Brunei', 'بروناي'),
(68, 'BO', 'BOL', 'Bolivie', 'بوليفيا'),
(535, 'BQ', 'BES', 'Bonaire_ Saint-Eustache et Saba', 'الجزر الكاريبية الهولندية'),
(76, 'BR', 'BRA', 'Brésil', 'البرازيل'),
(44, 'BS', 'BHS', 'Bahamas', 'باهاماس'),
(64, 'BT', 'BTN', 'Bhoutan', 'بوتان'),
(74, 'BV', 'BVT', 'Île Bouvet', 'جزيرة بوفيه'),
(72, 'BW', 'BWA', 'Botswana', 'بوتسوانا'),
(112, 'BY', 'BLR', 'Biélorussie', 'بيلاروس'),
(84, 'BZ', 'BLZ', 'Belize', 'بليز'),
(124, 'CA', 'CAN', 'Canada', 'كندا'),
(166, 'CC', 'CCK', 'Îles Cocos', 'جزر كوكس'),
(180, 'CD', 'COD', 'République démocratique du Congo', 'جمهورية الكونغو الديمقراطية'),
(140, 'CF', 'CAF', 'République centrafricaine', 'جمهورية أفريقيا الوسطى'),
(178, 'CG', 'COG', 'République du Congo', 'جمهورية الكونغو'),
(756, 'CH', 'CHE', 'Suisse', 'سويسرا'),
(384, 'CI', 'CIV', 'Côte d’Ivoire', 'ساحل العاج'),
(184, 'CK', 'COK', 'Îles Cook', 'جزر كوك'),
(152, 'CL', 'CHL', 'Chili', 'تشيلي'),
(120, 'CM', 'CMR', 'Cameroun', 'الكاميرون'),
(156, 'CN', 'CHN', 'Chine', 'الصين'),
(170, 'CO', 'COL', 'Colombie', 'كولومبيا'),
(188, 'CR', 'CRI', 'Costa Rica', 'كوستاريكا'),
(192, 'CU', 'CUB', 'Cuba', 'كوبا'),
(132, 'CV', 'CPV', 'Cap-Vert', 'الرأس الأخضر'),
(531, 'CW', 'CUW', 'Curaçao', 'كوراساو'),
(162, 'CX', 'CXR', 'Île Christmas', 'جزيرة عيد الميلاد'),
(196, 'CY', 'CYP', 'Chypre', 'قبرص'),
(203, 'CZ', 'CZE', 'République tchèque', 'التشيك'),
(276, 'DE', 'DEU', 'Allemagne', 'ألمانيا'),
(262, 'DJ', 'DJI', 'Djibouti', 'جيبوتي'),
(208, 'DK', 'DNK', 'Danemark', 'الدنمارك'),
(212, 'DM', 'DMA', 'Dominique', 'دومينيكا'),
(214, 'DO', 'DOM', 'République dominicaine', 'جمهورية الدومينيكان'),
(12, 'DZ', 'DZA', 'Algérie', 'الجزائر'),
(218, 'EC', 'ECU', 'Équateur', 'الإكوادور'),
(233, 'EE', 'EST', 'Estonie', 'إستونيا'),
(818, 'EG', 'EGY', 'Égypte', 'مصر'),
(732, 'EH', 'ESH', 'Sahara occidental', 'الصحراء الغربية'),
(232, 'ER', 'ERI', 'Érythrée', 'إريتريا'),
(724, 'ES', 'ESP', 'Espagne', 'إسبانيا'),
(231, 'ET', 'ETH', 'Éthiopie', 'إثيوبيا'),
(246, 'FI', 'FIN', 'Finlande', 'فنلندا'),
(242, 'FJ', 'FJI', 'Fidji', 'فيجي'),
(238, 'FK', 'FLK', 'Îles Malouines', 'جزر فوكلاند'),
(583, 'FM', 'FSM', 'Micronésie', 'ولايات ميكرونيسيا المتحدة'),
(234, 'FO', 'FRO', 'Îles Féroé', 'جزر فارو'),
(250, 'FR', 'FRA', 'France', 'فرنسا'),
(266, 'GA', 'GAB', 'Gabon', 'الغابون'),
(826, 'GB', 'GBR', 'Royaume-Uni', 'المملكة المتحدة'),
(308, 'GD', 'GRD', 'Grenade', 'غرينادا'),
(268, 'GE', 'GEO', 'Géorgie', 'جورجيا'),
(254, 'GF', 'GUF', 'Guyane', 'غويانا الفرنسية'),
(831, 'GG', 'GGY', 'Guernesey', 'غيرنزي'),
(288, 'GH', 'GHA', 'Ghana', 'غانا'),
(292, 'GI', 'GIB', 'Gibraltar', 'جبل طارق'),
(304, 'GL', 'GRL', 'Groenland', 'غرينلاند'),
(270, 'GM', 'GMB', 'Gambie', 'غامبيا'),
(324, 'GN', 'GIN', 'Guinée', 'غينيا'),
(312, 'GP', 'GLP', 'Guadeloupe', 'غوادلوب'),
(226, 'GQ', 'GNQ', 'Guinée équatoriale', 'غينيا الاستوائية'),
(300, 'GR', 'GRC', 'Grèce', 'اليونان'),
(239, 'GS', 'SGS', 'Géorgie du Sud-et-les Îles Sandwich du Sud', 'جورجيا الجنوبية وجزر ساندويتش الجنوبية'),
(320, 'GT', 'GTM', 'Guatemala', 'غواتيمالا'),
(316, 'GU', 'GUM', 'Guam', 'غوام'),
(624, 'GW', 'GNB', 'Guinée-Bissau', 'غينيا بيساو'),
(328, 'GY', 'GUY', 'Guyana', 'غيانا'),
(344, 'HK', 'HKG', 'Hong Kong', 'هونغ كونغ'),
(334, 'HM', 'HMD', 'Îles Heard-et-MacDonald', 'جزيرة هيرد وجزر ماكدونالد'),
(340, 'HN', 'HND', 'Honduras', 'هندوراس'),
(191, 'HR', 'HRV', 'Croatie', 'كرواتيا'),
(332, 'HT', 'HTI', 'Haïti', 'هايتي'),
(348, 'HU', 'HUN', 'Hongrie', 'المجر'),
(360, 'ID', 'IDN', 'Indonésie', 'إندونيسيا'),
(372, 'IE', 'IRL', 'Irlande', 'جمهورية أيرلندا'),
(376, 'IL', 'ISR', 'Israël', 'إسرائيل'),
(833, 'IM', 'IMN', 'Île de Man', 'جزيرة مان'),
(356, 'IN', 'IND', 'Inde', 'الهند'),
(86, 'IO', 'IOT', 'Territoire britannique de l’océan Indien', 'إقليم المحيط الهندي البريطاني'),
(368, 'IQ', 'IRQ', 'Irak', 'العراق'),
(364, 'IR', 'IRN', 'Iran', 'إيران'),
(352, 'IS', 'ISL', 'Islande', 'آيسلندا'),
(380, 'IT', 'ITA', 'Italie', 'إيطاليا'),
(832, 'JE', 'JEY', 'Jersey', 'جيرزي'),
(388, 'JM', 'JAM', 'Jamaïque', 'جامايكا'),
(400, 'JO', 'JOR', 'Jordanie', 'الأردن'),
(392, 'JP', 'JPN', 'Japon', 'اليابان'),
(404, 'KE', 'KEN', 'Kenya', 'كينيا'),
(417, 'KG', 'KGZ', 'Kirghizistan', 'قيرغيزستان'),
(116, 'KH', 'KHM', 'Cambodge', 'كمبوديا'),
(296, 'KI', 'KIR', 'Kiribati', 'كيريباتي'),
(174, 'KM', 'COM', 'Comores', 'جزر القمر'),
(659, 'KN', 'KNA', 'Saint-Christophe-et-Niévès', 'سانت كيتس ونيفيس'),
(408, 'KP', 'PRK', 'Corée du Nord', 'كوريا الشمالية'),
(410, 'KR', 'KOR', 'Corée du Sud', 'كوريا الجنوبية'),
(414, 'KW', 'KWT', 'Koweït', 'الكويت'),
(136, 'KY', 'CYM', 'Îles Caïmans', 'جزر كايمان'),
(398, 'KZ', 'KAZ', 'Kazakhstan', 'كازاخستان'),
(418, 'LA', 'LAO', 'Laos', 'لاوس'),
(422, 'LB', 'LBN', 'Liban', 'لبنان'),
(662, 'LC', 'LCA', 'Sainte-Lucie', 'سانت لوسيا'),
(438, 'LI', 'LIE', 'Liechtenstein', 'ليختنشتاين'),
(144, 'LK', 'LKA', 'Sri Lanka', 'سريلانكا'),
(430, 'LR', 'LBR', 'Liberia', 'ليبيريا'),
(426, 'LS', 'LSO', 'Lesotho', 'ليسوتو'),
(440, 'LT', 'LTU', 'Lituanie', 'ليتوانيا'),
(442, 'LU', 'LUX', 'Luxembourg', 'لوكسمبورغ'),
(428, 'LV', 'LVA', 'Lettonie', 'لاتفيا'),
(434, 'LY', 'LBY', 'Libye', 'ليبيا'),
(504, 'MA', 'MAR', 'Maroc', 'المغرب'),
(492, 'MC', 'MCO', 'Monaco', 'موناكو'),
(498, 'MD', 'MDA', 'Moldavie', 'مولدوفا'),
(499, 'ME', 'MNE', 'Monténégro', 'الجبل الأسود'),
(663, 'MF', 'MAF', 'Saint-Martin (Antilles françaises)', 'سانت مارتن الفرنسية'),
(450, 'MG', 'MDG', 'Madagascar', 'مدغشقر'),
(584, 'MH', 'MHL', 'Marshall', 'جزر مارشال'),
(807, 'MK', 'MKD', 'Macédoine', 'جمهورية مقدونيا'),
(466, 'ML', 'MLI', 'Mali', 'مالي'),
(104, 'MM', 'MMR', 'Birmanie', 'بورما'),
(496, 'MN', 'MNG', 'Mongolie', 'منغوليا'),
(446, 'MO', 'MAC', 'Macao', 'ماكاو'),
(580, 'MP', 'MNP', 'Îles Mariannes du Nord', 'جزر ماريانا الشمالية'),
(474, 'MQ', 'MTQ', 'Martinique', 'مارتينيك'),
(478, 'MR', 'MRT', 'Mauritanie', 'موريتانيا'),
(500, 'MS', 'MSR', 'Montserrat', 'مونتسرات'),
(470, 'MT', 'MLT', 'Malte', 'مالطا'),
(480, 'MU', 'MUS', 'Maurice', 'موريشيوس'),
(462, 'MV', 'MDV', 'Maldives', 'جزر المالديف'),
(454, 'MW', 'MWI', 'Malawi', 'مالاوي'),
(484, 'MX', 'MEX', 'Mexique', 'المكسيك'),
(458, 'MY', 'MYS', 'Malaisie', 'ماليزيا'),
(508, 'MZ', 'MOZ', 'Mozambique', 'موزمبيق'),
(516, 'NA', 'NAM', 'Namibie', 'ناميبيا'),
(540, 'NC', 'NCL', 'Nouvelle-Calédonie', 'كاليدونيا الجديدة'),
(562, 'NE', 'NER', 'Niger', 'النيجر'),
(574, 'NF', 'NFK', 'Île Norfolk', 'جزيرة نورفولك'),
(566, 'NG', 'NGA', 'Nigeria', 'نيجيريا'),
(558, 'NI', 'NIC', 'Nicaragua', 'نيكاراغوا'),
(528, 'NL', 'NLD', 'Pays-Bas', 'هولندا'),
(578, 'NO', 'NOR', 'Norvège', 'النرويج'),
(524, 'NP', 'NPL', 'Népal', 'نيبال'),
(520, 'NR', 'NRU', 'Nauru', 'ناورو'),
(570, 'NU', 'NIU', 'Niue', 'نييوي'),
(554, 'NZ', 'NZL', 'Nouvelle-Zélande', 'نيوزيلندا'),
(512, 'OM', 'OMN', 'Oman', 'سلطنة عمان'),
(591, 'PA', 'PAN', 'Panama', 'بنما'),
(604, 'PE', 'PER', 'Pérou', 'بيرو'),
(258, 'PF', 'PYF', 'Polynésie française', 'بولينزيا الفرنسية'),
(598, 'PG', 'PNG', 'Papouasie-Nouvelle-Guinée', 'بابوا غينيا الجديدة'),
(608, 'PH', 'PHL', 'Philippines', 'الفلبين'),
(586, 'PK', 'PAK', 'Pakistan', 'باكستان'),
(616, 'PL', 'POL', 'Pologne', 'بولندا'),
(666, 'PM', 'SPM', 'Saint-Pierre-et-Miquelon', 'سان بيير وميكلون'),
(612, 'PN', 'PCN', 'Îles Pitcairn', 'جزر بيتكيرن'),
(630, 'PR', 'PRI', 'Porto Rico', 'بورتوريكو'),
(275, 'PS', 'PSE', 'Autorité palestinienne', 'دولة فلسطين'),
(620, 'PT', 'PRT', 'Portugal', 'البرتغال'),
(585, 'PW', 'PLW', 'Palaos', 'بالاو'),
(600, 'PY', 'PRY', 'Paraguay', 'باراغواي'),
(634, 'QA', 'QAT', 'Qatar', 'قطر'),
(638, 'RE', 'REU', 'La Réunion', 'لا ريونيون'),
(642, 'RO', 'ROU', 'Roumanie', 'رومانيا'),
(688, 'RS', 'SRB', 'Serbie', 'صربيا'),
(643, 'RU', 'RUS', 'Russie', 'روسيا'),
(646, 'RW', 'RWA', 'Rwanda', 'رواندا'),
(682, 'SA', 'SAU', 'Arabie saoudite', 'السعودية'),
(90, 'SB', 'SLB', 'Salomon', 'جزر سليمان'),
(690, 'SC', 'SYC', 'Seychelles', 'سيشل'),
(736, 'SD', 'SDN', 'Soudan', 'السودان'),
(752, 'SE', 'SWE', 'Suède', 'السويد'),
(702, 'SG', 'SGP', 'Singapour', 'سنغافورة'),
(654, 'SH', 'SHN', 'Sainte-Hélène_ Ascension et Tristan da Cunha', 'سانت هيلينا وأسينشين وتريستان دا كونا'),
(705, 'SI', 'SVN', 'Slovénie', 'سلوفينيا'),
(744, 'SJ', 'SJM', 'Svalbard et île Jan Mayen', 'سفالبارد ويان ماين'),
(703, 'SK', 'SVK', 'Slovaquie', 'سلوفاكيا'),
(694, 'SL', 'SLE', 'Sierra Leone', 'سيراليون'),
(674, 'SM', 'SMR', 'Saint-Marin', 'سان مارينو'),
(686, 'SN', 'SEN', 'Sénégal', 'السنغال'),
(706, 'SO', 'SOM', 'Somalie', 'الصومال'),
(740, 'SR', 'SUR', 'Suriname', 'سورينام'),
(728, 'SS', 'SSD', 'Soudan du Sud', 'جنوب السودان'),
(678, 'ST', 'STP', 'Sao Tomé-et-Principe', 'ساو تومي وبرينسيب'),
(222, 'SV', 'SLV', 'Salvador', 'السلفادور'),
(534, 'SX', 'SXM', 'Saint-Martin', 'سينت مارتن'),
(760, 'SY', 'SYR', 'Syrie', 'سوريا'),
(748, 'SZ', 'SWZ', 'Swaziland', 'سوازيلاند'),
(796, 'TC', 'TCA', 'Îles Turques-et-Caïques', 'جزر توركس وكايكوس'),
(148, 'TD', 'TCD', 'Tchad', 'تشاد'),
(260, 'TF', 'ATF', 'Terres australes et antarctiques françaises', 'أراض فرنسية جنوبية وأنتارتيكية'),
(768, 'TG', 'TGO', 'Togo', 'توغو'),
(764, 'TH', 'THA', 'Thaïlande', 'تايلاند'),
(762, 'TJ', 'TJK', 'Tadjikistan', 'طاجيكستان'),
(772, 'TK', 'TKL', 'Tokelau', 'توكلو'),
(626, 'TL', 'TLS', 'Timor oriental', 'تيمور الشرقية'),
(795, 'TM', 'TKM', 'Turkménistan', 'تركمانستان'),
(788, 'TN', 'TUN', 'Tunisie', 'تونس'),
(776, 'TO', 'TON', 'Tonga', 'تونغا'),
(792, 'TR', 'TUR', 'Turquie', 'تركيا'),
(780, 'TT', 'TTO', 'Trinité-et-Tobago', 'ترينيداد وتوباغو'),
(798, 'TV', 'TUV', 'Tuvalu', 'توفالو'),
(158, 'TW', 'TWN', 'Taïwan _ République de Chine (Taïwan)', 'تايوان'),
(834, 'TZ', 'TZA', 'Tanzanie', 'تنزانيا'),
(804, 'UA', 'UKR', 'Ukraine', 'أوكرانيا'),
(800, 'UG', 'UGA', 'Ouganda', 'أوغندا'),
(581, 'UM', 'UMI', 'Îles mineures éloignées des États-Unis', 'جزر الولايات المتحدة الصغيرة النائية'),
(840, 'US', 'USA', 'États-Unis', 'الولايات المتحدة'),
(858, 'UY', 'URY', 'Uruguay', 'الأوروغواي'),
(860, 'UZ', 'UZB', 'Ouzbékistan', 'أوزبكستان'),
(670, 'VC', 'VCT', 'Saint-Vincent-et-les-Grenadines', 'سانت فنسنت والجرينادين'),
(862, 'VE', 'VEN', 'Venezuela', 'فنزويلا'),
(92, 'VG', 'VGB', 'Îles Vierges britanniques', 'الجزر العذراء البريطانية'),
(850, 'VI', 'VIR', 'Îles Vierges des États-Unis', 'جزر العذراء الأمريكية'),
(704, 'VN', 'VNM', 'Viêt Nam', 'فيتنام'),
(548, 'VU', 'VUT', 'Vanuatu', 'فانواتو'),
(876, 'WF', 'WLF', 'Wallis-et-Futuna', 'والس وفوتونا'),
(882, 'WS', 'WSM', 'Samoa', 'ساموا'),
(887, 'YE', 'YEM', 'Yémen', 'اليمن'),
(175, 'YT', 'MYT', 'Mayotte', 'مايوت'),
(710, 'ZA', 'ZAF', 'Afrique du Sud', 'جنوب أفريقيا'),
(894, 'ZM', 'ZMB', 'Zambie', 'زامبيا'),
(716, 'ZW', 'ZWE', 'Zimbabwe', 'زيمبابوي');

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `ppr` int(11) DEFAULT NULL,
  `cni` varchar(12) NOT NULL,
  `nomFr` varchar(254) NOT NULL,
  `prenomFr` varchar(254) DEFAULT NULL,
  `nomAr` varchar(254) DEFAULT NULL,
  `prenomAr` varchar(254) DEFAULT NULL,
  `dateNaiss` date DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL,
  `civilite` varchar(4) DEFAULT NULL,
  `situationFam` char(1) DEFAULT NULL,
  `dateRecrutement` date DEFAULT NULL,
  `adressePerso` text,
  `numCartComm` int(11) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `telPerso` varchar(20) DEFAULT NULL,
  `telProf` varchar(20) DEFAULT NULL,
  `echelle` int(11) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT '1',
  `agentComm` tinyint(1) DEFAULT '0',
  `detacheDe` tinyint(1) DEFAULT '0',
  `detacheVers` tinyint(1) DEFAULT '0',
  `photo` varchar(254) DEFAULT NULL,
  `codeV` int(11) DEFAULT NULL,
  `codeLocal` int(11) DEFAULT NULL,
  `idNE` int(11) DEFAULT NULL,
  PRIMARY KEY (`cni`),
  KEY `FK_association18` (`idNE`),
  KEY `FK_association19` (`codeV`),
  KEY `FK_association7` (`codeLocal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`ppr`, `cni`, `nomFr`, `prenomFr`, `nomAr`, `prenomAr`, `dateNaiss`, `sexe`, `civilite`, `situationFam`, `dateRecrutement`, `adressePerso`, `numCartComm`, `email`, `telPerso`, `telProf`, `echelle`, `actif`, `agentComm`, `detacheDe`, `detacheVers`, `photo`, `codeV`, `codeLocal`, `idNE`) VALUES
(1765432, 'EE123456', 'GUENNOUN', 'ISMAIL', 'كنون', 'اسماعيل', '1991-08-29', 'M', 'M', '0', '2015-06-08', 'Maskan 3 BIS MARRAKECH', NULL, 'I.GUENNOUN@DRI.MA', NULL, '06 07 08 09 10', 9, 1, 0, 0, 0, NULL, 192, 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE IF NOT EXISTS `region` (
  `codeR` int(11) NOT NULL,
  `libelleRFr` varchar(254) DEFAULT NULL,
  `libelleRAr` varchar(254) DEFAULT NULL,
  `codeP` int(11) NOT NULL,
  PRIMARY KEY (`codeR`),
  KEY `FK_association15` (`codeP`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `region`
--

INSERT INTO `region` (`codeR`, `libelleRFr`, `libelleRAr`, `codeP`) VALUES
(1, 'Région Tanger-Tétouan-Al Hoceïma ', 'جهة طنجة تطوان الحسيمة', 504),
(2, 'Région Oriental ', 'جهة الشرق', 504),
(3, 'Région Fès-Meknès ', 'جهة فاس مكناس', 504),
(4, 'Région Rabat-Salé-Kénitra ', 'جهة الرباط سلا القنيطرة', 504),
(5, 'Région Béni Mellal-Khénifra ', 'جهة بني ملال خنيفرة', 504),
(6, 'Région Casablanca-Settat ', 'جهة الدار البيضاء سطات', 504),
(7, 'Région Marrakech-Safi ', 'جهة مراكش آسفي', 504),
(8, 'Région Drâa-Tafilalet ', 'جهة درعة تافيلالت', 504),
(9, 'Région Souss-Massa ', 'جهة سوس ماسة', 504),
(10, 'Région Guelmim-Oued Noun ', 'جهة كلميم واد نون', 504),
(11, 'Région Laâyoune-Sakia el Hamra', 'جهة العيون الساقية الحمراء', 504),
(12, 'Région Dakhla-Oued Ed-Dahab', 'جهة الداخلة وادي الذهب', 504),
(100, 'Wilaya Alger', 'ولاية الجزائر', 12),
(200, 'Région Île-de-France', 'جهة إيل دو فرانس', 250),
(201, 'Région Provence Alpes-Côte d’Azur', 'جهة الألب البحرية', 250);

-- --------------------------------------------------------

--
-- Structure de la table `specdiplome`
--

DROP TABLE IF EXISTS `specdiplome`;
CREATE TABLE IF NOT EXISTS `specdiplome` (
  `codeSpecDip` int(11) NOT NULL AUTO_INCREMENT,
  `intituleSpec` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`codeSpecDip`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `specdiplome`
--

INSERT INTO `specdiplome` (`codeSpecDip`, `intituleSpec`) VALUES
(1, 'ACTUARIAT ET FINANCES'),
(2, 'ADMINISTRATION DES AFFAIRES'),
(3, 'AGRO-ECONOMIE'),
(4, 'ANALYSE ECONOMIQUE ET DEVELOPPEMENT'),
(5, 'ASSISTANAT ET ORGANISATION DES ENTREPRISES'),
(6, 'AUDIT ET CONTRÔLE DE GESTION'),
(7, 'BACK OFFICE BANCAIRE'),
(8, 'BIOLOGIE'),
(9, 'COMPTABILITE'),
(10, 'COMPTABILITE CONTROLE AUDIT'),
(11, 'COMPTABILITE D\'ENTREPRISE'),
(12, 'COMPTABILITE ET GESTION'),
(13, 'COMTABILITE ET FINANCES'),
(14, 'CONTRÔLE QUALITE ET MAINTENANCE'),
(15, 'CORPORATE FINANCE ET MODELISATION FINANCIERE'),
(16, 'DESA AUDIT ET CONTRÔLE'),
(17, 'DEVELOPEMENT INFORMATIQUE'),
(18, 'DROIT CIVIL'),
(19, 'DROIT DE L\'ENTREPRISE'),
(20, 'DROIT DES AFFAIRES'),
(21, 'DROIT DES AFFAIRES ET DES ENTREPRISES'),
(22, 'DROIT ECONOMIE GESTION-COMPTABILITÉ-CONTRÔLE-AUDIT'),
(23, 'DROIT IMMOBILIER ET NOTARIAL'),
(24, 'DROIT PRIVE'),
(25, 'DROITS DES CONTENTIEUX'),
(26, 'ECONOMIE'),
(27, 'ECONOMIE APPLIQUEE'),
(28, 'ECONOMIE ET FINANCE INTERNATIONNALES'),
(29, 'ECONOMIE ET GESTION'),
(30, 'ECONOMIE, BANQUE FINANCE ET GESTION DES RISQUES'),
(31, 'ENTREPRENARIAT ET STRATEGIE DES PME'),
(32, 'ETUDES ISLAMIQUES'),
(33, 'FINANCE'),
(34, 'FINANCE APPLIQUEE'),
(35, 'FINANCE COMPTABILITE ET FISCALITE'),
(36, 'FINANCE ET COMPTABILITE'),
(37, 'FINANCE ET MANGEMENT DES INSTITUTIONS FINANCIERES'),
(38, 'FINANCE LOCALE'),
(39, 'FINANCES D\'ENTREPRISES'),
(40, 'FINANCES DU MARCHE ET MANAGEMENT DES RISQUES'),
(41, 'FINANCES ET ASSURANCES'),
(42, 'GENIE DES PROCEDES INDUSTRIELS'),
(43, 'GESTION COMPTABILITE'),
(44, 'GESTION DES ENTREPRISES'),
(45, 'GESTION DES PME-PMI'),
(46, 'GESTION DES RESSOURCES HUMAINES'),
(47, 'GESTION FINANCIERE'),
(48, 'GESTION FINANCIERE ET COMPTABILITE'),
(49, 'HISTOIRE GEO'),
(50, 'INFORMATIQUE BUREAUTIQUE'),
(51, 'INFORMATIQUE DE GESTION'),
(52, 'INFORMATISTE-ARCHIVISTE'),
(53, 'INGENIERIE DU SYSTEME D\'INFORMATION'),
(54, 'LETTRE ET SCIENCES HUMAINES'),
(55, 'LETTRE MODERNE'),
(56, 'LICENCE PROFESSIONNELLE EN GESTION DES INSTITUTIONS A CARACTERE SOCIAL'),
(57, 'MACRO-ECONOMIE'),
(58, 'MANAGEMENT DES RESSOURCES HUMAINES'),
(59, 'MANAGEMENT ET ADMINISTRATION DES ENTREPRISES'),
(60, 'MANAGEMENT FINANCE, COMPTABILITE ET FISCALITE'),
(61, 'MANAGEMENT FINANCIER DE L\'ENTREPRISE'),
(62, 'MANAGEMENT PUBLIC'),
(63, 'MANAGEMENT PUBLIC ET DEVELOPPEMENT TERRITORIAL'),
(64, 'MARKETING ET MANAGEMENT DE L\'ACTION COMMERCIALE'),
(65, 'POLITIQUES URBAINES & INGENIERIE TERRITORIALE'),
(66, 'RECHERCHE OPERATIONNELLE ET AIDE A LA DECISION'),
(67, 'SCIENCES DE GESTION'),
(68, 'SCIENCE EXPERIMENTAL'),
(69, 'SCIENCES DE MANAGEMENT'),
(70, 'SCIENCES DE MANAGEMENT & FINANCE'),
(71, 'SCIENCES ECONOMIQUES'),
(72, 'SCIENCES HUMAINES'),
(73, 'SCIENCES MANAGEMENT - FINANCE'),
(74, 'STATISTIQUE'),
(75, 'STATISTIQUE ET ECONOMIE APPLIQUEE'),
(76, 'STRATEGIE DES PME'),
(77, 'STRATEGIE ET MANAGEMENT DES RESSOURCES HUMAINES'),
(78, 'SYSTEME D\'INFORMATION'),
(79, 'TECHNIQUES DE MANAGEMENT'),
(80, 'THEORIE ECONOMIQUE ET TECHNIQUES QUANTITATIVES'),
(81, 'NON DEFINI');

-- --------------------------------------------------------

--
-- Structure de la table `typeus`
--

DROP TABLE IF EXISTS `typeus`;
CREATE TABLE IF NOT EXISTS `typeus` (
  `codeTypeUS` int(11) NOT NULL AUTO_INCREMENT,
  `libelleTypeUSFr` varchar(254) DEFAULT NULL,
  `libelleTypeUSAr` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`codeTypeUS`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `typeus`
--

INSERT INTO `typeus` (`codeTypeUS`, `libelleTypeUSFr`, `libelleTypeUSAr`) VALUES
(1, 'Direction', 'المديرية'),
(2, 'Service', 'مصلحة'),
(3, 'SERVICE ASSIETTE', 'مصلحة الوعاء الضريبي'),
(4, 'SERVICE REGIONAL D\' INSPECTION', 'المصلحة الجهوية للتفتيش والتدقيق'),
(5, 'SERVICE REGIONAL DES RESSOURCES ET DU SYSTEME D\'INFORMATION', 'المصلحة الجهوية للموارد و النظام المعلوماتي'),
(6, 'SERVICE REGIONALE DE VERIFICATION', 'المصلحة الجهوية للتحقيقات'),
(7, 'SERVICE REGIONAL RECOUVREMENT -STATISTIQUES', 'المصلحة الجهوية للتحصيل'),
(8, 'SUBDIVISION', 'التقسيمة'),
(9, 'Brigade', 'الفرقة'),
(10, 'BRIGADE DU VERIFICATION', 'فرقة التحقيقات'),
(11, 'Bureau', 'مكتب'),
(12, 'BUREAU CONTRÔLE ENREGISTREMENT ET IR/PI', 'مكتب المراقبة'),
(13, 'BUREAU D\' ACCUEIL ET DE COORDINATION', 'مكتب الاستقبال و التنسيق'),
(14, 'BUREAU DES AFFAIRES JUDICIAIRES', 'مكتب الشؤون القضائية'),
(15, 'BUREAU DES RESSOURCES', 'مكتب الموارد'),
(16, 'BUREAU ENREGISTREMENT ET TIMBRES', 'مكتب التسجيل والتمبر'),
(17, 'CENTRE DE FORMATION', 'المركز الجهوي للتكوين'),
(18, 'CENTRE INFORMATIQUE', 'المركز الجهوي للإعلاميات'),
(19, 'RECETTE DE L\'ADMINISTRATION FISCALE', 'قباضة الادارة الجبائية'),
(20, 'SECTEUR', 'قطاع'),
(21, 'SECTION', 'شعبة'),
(22, 'SECTION BUREAUTIQUE - CENTRE REGIONAL D\'INFORMATIQUE', ''),
(23, 'SECTION CONTRÔLE ET SURVEILLANCE (E.T.ORD)', ''),
(24, 'SECTION DE COMPTABILITE', ''),
(25, 'SECTION DES AFFAIRES JUDICIAIRES', ''),
(26, 'SECTION DU BUDGET ET DES EQUIPEMENTS', ''),
(27, 'SECTION DU FICHIER D\'ARCHIVAGE ET DE DOCUMENTATIONS', ''),
(28, 'SECTION DU SUIVI DES RECOURS DEVANT LES COMMISSIONS LOCALES DE TAXATION', ''),
(29, 'SECTION EXPLOITATION - CENTRE REGIONAL D\'INFORMATIQUE', ''),
(30, 'SECTION INSUFFISANCE DE PRIX', ''),
(31, 'SECTION IR/SOURCE', ''),
(32, 'SECTION LOGISTIQUE - CENTRE REGIONAL D\'INFORMATIQUE', ''),
(33, 'SECTION RECOUVREMENT FORCE', ''),
(34, 'SECTION REMB/EXONERATION TVA', ''),
(35, 'SECTION RESSOURCES HUMAINES', ''),
(36, 'SECTION RESTITUTIONS IR', ''),
(37, 'SECTION TITRES D\'ANNULATION', 'شعبة الإصدارات، سندات الإلغاء، المحاسبة و الإحصائيات'),
(38, 'SECTION TPI', ''),
(39, 'GUICHET', 'شباك'),
(40, 'Non défini', ' ');

-- --------------------------------------------------------

--
-- Structure de la table `us`
--

DROP TABLE IF EXISTS `us`;
CREATE TABLE IF NOT EXISTS `us` (
  `codeUS` int(11) NOT NULL,
  `libelleUSFr` varchar(254) DEFAULT NULL,
  `libelleUSAr` varchar(254) DEFAULT NULL,
  `codeUSParent` int(11) DEFAULT NULL,
  `codeTypeUS` int(11) DEFAULT NULL,
  `etat` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`codeUS`),
  KEY `FK_association11` (`codeUSParent`),
  KEY `FK_association9` (`codeTypeUS`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `us`
--

INSERT INTO `us` (`codeUS`, `libelleUSFr`, `libelleUSAr`, `codeUSParent`, `codeTypeUS`, `etat`) VALUES
(11000, 'DIRECTION REGIONALE DES IMPOTS DE MARRAKECH', '', 0, 1, 1),
(11002, 'BUREAU D\' ACCUEIL ET DE COORDINATION TARGA MARRAKECH', '', 11005, 13, 1),
(11003, 'CENTRE REGIONAL D\'INFORMATIQUE MARRAKECH', '', 11005, 18, 1),
(11004, 'SERVICE REGIONAL D\'AUDIT ET D\'INSPECTION - MARRAKECH', '', 11000, 4, 1),
(11005, 'SERVICE REGIONAL DES RESSOURCES ET DU SYSTEME D\'INFORMATION MARRAKECH', '', 11000, 5, 1),
(11006, 'CENTRE REGIONAL DE FORMATION - MARRAKECH', '', 11005, 17, 1),
(11008, 'SUBDIVISION 1 DES PERSONNES MORALES MARRAKECH', '', 11059, 8, 1),
(11009, 'SECTEUR 1 SUBDIVISION 3 DES PERSONNES MORALES DE MARRAKECH', '', 11146, 20, 1),
(11010, 'SECTEUR 1 SUBDIVISION 2 DES PERSONNES MORALES MARRAKECH', '', 11123, 20, 1),
(11011, 'SECTEUR 2 SUBDIVISION 3 DES PERSONNES MORALES DE MARRAKECH', '', 11146, 20, 1),
(11012, 'SECTEUR 2 SUBDIVISION 2 PERSONNES MORALES MARRAKECH', '', 11123, 20, 1),
(11014, 'SECTION -EXONERATIONS-REMBOURSEMENT - SUB 1-PM-MARRAKECH', '', 11008, 34, 1),
(11025, 'RECETTE DE L\'ADMINISTRATION FISCALE DE BENGUERIR (TTES ATT)', '', 11120, 19, 1),
(11042, 'SECTEUR AUTONOME AIT OURIR', '', 11154, 20, 1),
(11049, 'RECETTE DE L\'ADMINISTRATION FISCALE - TARGA - MARRAKECH', '', 11120, 19, 1),
(11055, '1ER SERVICE REGIONAL DES VERIFICATIONS - MARRAKECH', '', 11000, 6, 1),
(11056, 'BRIGADE 1 - SERVICE 2 DES VERIFICATIONS - MARRAKECH', '', 11172, 10, 1),
(11059, 'SERVICE REGIONAL DES PERSONNES MORALES MARRAKECH', '', 11000, 3, 1),
(11060, 'SERVICE REGIONAL DES PROFESSIONNELS MARRAKECH', '', 11000, 3, 1),
(11061, 'SERVICE REGIONAL DES PARTICULIERS MARRAKECH', '', 11000, 3, 1),
(11062, 'SUBDIVISION POLYVALENTE ESSAOUIRA', '', 11061, 8, 1),
(11064, '11064-BUREAU D ENREGISTREMENT ET DU TIMBRE - ESSAOUIRA', '', 11061, 16, 1),
(11065, 'RECETTE DE L\'ADMINISTRATION FISCALE ESSAOUIRA', '', 11120, 19, 1),
(11067, 'SECTION DES RESSOURCES HUMAINES MARRAKECH', '', 11005, 35, 1),
(11068, 'CENTRE D\'ACCUEIL MARRAKECH', '', 11005, 40, 1),
(11069, 'BRIGADE 2 - SERVICE 2 DES VERIFICATIONS - MARRAKECH', '', 11172, 10, 1),
(11070, 'BRIGADE 1 - SERVICE 1 DES VERIFICATIONS - MARRAKECH', '', 11055, 10, 1),
(11071, '11071-BUREAU D ENREGISTREMENT DES ACTES NOTARIES ET ACTES DE SOCIETES - MARRAKECH', '', 11059, 16, 1),
(11072, 'SECTION DU RECOUVREMENT FORCE TARGA', '', 11049, 33, 1),
(11073, 'SUBDIVISION POLYVALENTE EL KELAA DES SRAGHNAS', '', 11059, 8, 1),
(11074, 'SECTEUR DES PROFESSIONNELS EL KELAA DES SRAGHNAS', '', 11073, 20, 1),
(11075, 'SECTEUR DE LA FISCALITE DES PARTICULIERS - EL KELAA DES SRAGHNAS', '', 11073, 20, 1),
(11076, 'SECTEUR DE LA FISCALITE DES PERSONNES MORALES - EL KELAA DES SRAGHNAS', '', 11073, 20, 1),
(11078, 'RECETTE DE L\'ADMINISTRATION FISCALE EL KELAA DES SRAGHNAS ( B.TOUTES ATTRIBUTIONS)', '', 11120, 19, 1),
(11079, 'SUBDIVISION DE LA FISCALITE DES PROFESSIONNELS MARRAKECH - HAY MOHAMMADI', '', 11060, 8, 1),
(11080, 'SECTEUR 1 SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH HAY MOHAMMADI', '', 11079, 20, 1),
(11081, 'SECTEUR 2 SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH HAY MOHAMMADI', '', 11079, 20, 1),
(11082, '11082-SECTEUR 3 SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH HAY MOHAMMADI', '', 11079, 20, 1),
(11083, 'SECTION IR-SOURCE SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH HAY MOHAMMADI', '', 11079, 31, 1),
(11084, 'SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH -GUELIZ-TARGA', '', 11060, 8, 1),
(11085, 'SECTEUR 1 SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH -GUELIZ-TARGA', '', 11084, 20, 1),
(11086, 'SECTEUR 2 SUBDIVISION -FISCALITE DES PROFESSIONNELS MARRAKECH -GUELIZ-TARGA', '', 11084, 20, 1),
(11087, 'SECTEUR 3 SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH -GUELIZ-TARGA', '', 11084, 20, 1),
(11088, 'SECTEUR POLYVALENT - IMINTANOUTE', '', 11156, 20, 1),
(11089, 'SUBDIVISION - FISCALITE DES PROFESSIONNELS MARRAKECH - MEDINA-SIDI YOUSSEF BEN ALI', '', 11060, 8, 1),
(11090, 'SECTEUR 1 SUBDIVISION - FISCALITE DES PROFESSIONNELS MEDINA-SIDI YOUSSEF BEN ALI', '', 11089, 20, 1),
(11091, 'SECTEUR 2 SUBDIVISION - FISCALITE DES PROFESSIONNELS MEDINA-SIDI YOUSSEF BEN ALI', '', 11089, 20, 1),
(11092, 'SECTEUR 3 SUBDIVISION - FISCALITE DES PROFESSIONNELS MEDINA-SIDI YOUSSEF BEN ALI', '', 11089, 20, 1),
(11099, 'RECETTE DE L\'ADMINISTRATION FISCALE MARRAKECH ALLAL ELFASSI', '', 11120, 19, 1),
(11100, 'SUBDIVISION - FISCALITE DES PARTICULIERS HAY MOHAMMADI GUELIZ TARGA', '', 11061, 8, 1),
(11101, 'SECTEUR - FISCALITE DES PARTICULIERS GUELIZ-', '', 11100, 20, 1),
(11102, 'SECTEUR - FISCALITE DES PARTCULIERS TARGA-', '', 11100, 20, 1),
(11103, 'SECTEUR 1 -FISCALITE DES PARTCULIERS HAY MOHAMMADI -MARRAKECH -', '', 11100, 20, 1),
(11104, 'SECTEUR 2 - FISCALITE DES PARTCULIERS HAY MOHAMMADI -MARRAKECH-', '', 11100, 20, 1),
(11107, '11107-BUREAU CHARGE DU CONTRÔLE - MARRAKECH', '', 11061, 12, 1),
(11108, 'SECTION IR-PI MARRAKECH', '', 11107, 38, 1),
(11109, 'SECTION DES INSUFFISANCES DES PRIX MARRAKECH', '', 11107, 30, 1),
(11110, 'SUBDIVISION - FISCALITE DES PARTCULIERS - MEDINA-SIDI YOUSSEF BEN ALI - MARRAKECH -', '', 11061, 8, 1),
(11111, 'SECTEUR 1 - FISCALITE DES PARTCULIERS MEDINA - SIDI YOUSSEF BEN ALI MARRAKECH', '', 11110, 20, 1),
(11112, 'SECTEUR 2 - FISCALITE DES PARTCULIERS MEDINA -SIDI YOUSSEF BEN ALI MARRAKECH', '', 11110, 20, 1),
(11113, 'SECTEUR 3 - FISCALITE DES PARTCULIERS MEDINA-SIDI YOUSSEF BEN ALI MARRAKECH', '', 11110, 20, 1),
(11114, 'SECTION TVA-LASMC SUB.FISC PARTICULIERS MEDINA SIDI YOUSSEF BEN ALI MARRAKECH', '', 11110, 40, 1),
(11115, 'SECTION- EMISSIONS -TITRES D\'ANNULATION-COMPTABILITE ET STATISTIQUES MARRAKECH', '', 11120, 37, 1),
(11117, 'SECTEUR DES PERSONNES MORALES ESSAOUIRA', '', 11062, 20, 1),
(11120, 'SERVICE REGIONAL DU RECOUVREMENT - MARRAKECH', '', 11000, 7, 1),
(11121, 'SECTEUR DE LA FISCALITE DES PARTICULIERS - ESSAOUIRA', '', 11062, 20, 1),
(11122, 'BRIGADE 2 - SERVICE 1 DES VERIFICATIONS - MARRAKECH', '', 11055, 10, 1),
(11123, 'SUBDIVISION 2 DES PERSONNES MORALES MARRAKECH', '', 11059, 8, 1),
(11126, 'SECTION IR SOURCE SUBDIVISION 1 DES PERSONNES MORALES MARRAKECH', '', 11008, 31, 1),
(11127, 'SECTION DU BUDGET MARRAKECH', '', 11005, 26, 1),
(11128, 'SECTION LOGISTIQUE - CENTRE REGIONAL D\'INFORMATIQUE MARRAKECH', '', 11003, 32, 1),
(11129, 'SECTION BUREAUTIQUE - CENTRE REGIONAL D\'INFORMATIQUE MARRAKECH', '', 11003, 22, 1),
(11130, 'SECTION EXPLOITATION - CENTRE REGIONAL D\'INFORMATIQUE MARRAKECH', '', 11003, 29, 1),
(11131, 'SECTION DE SURVEILLANCE - MARRAKECH', '', 11071, 40, 1),
(11132, 'SECTION DE LA COMPTABILITE - TARGA', '', 11049, 24, 1),
(11133, 'SECTION DE LA COMPTABILITE - ALLAL EL FASSI', '', 11099, 24, 1),
(11134, 'BUREAU D\' ACCUEIL ET DE COORDINATION - ALLAL EL FASSI MARRAKECH', '', 11060, 13, 1),
(11135, 'SECTION DU RECOUVREMENT FORCE - ALLAL EL FASSI', '', 11099, 33, 1),
(11136, 'BUREAU DES AFFAIRES JUDICIAIRES - MARRAKECH', '', 11000, 14, 1),
(11137, '1ERE SECTION CHARGEE DES AFFAIRES JUDICIAIRES - MARRAKECH', '', 11136, 25, 1),
(11138, '2EME SECTION CHARGEE DES AFFAIRES JUDICIAIRES - MARRAKECH', '', 11136, 25, 1),
(11139, 'SECTION DU SUIVI DES RECOURS DEVANT LES COMMISSIONS LOCALES DE TAXATION - MARRAKECH', '', 11172, 28, 1),
(11142, 'SECTION DES ARCHIVES -MARRAKECH', '', 11005, 40, 1),
(11145, 'SECTEUR POLYVALENT - CHICHAOUA', '', 11156, 20, 1),
(11146, 'SUBDIVISION 3 DES PERSONNES MORALES MARRAKECH', '', 11059, 8, 1),
(11147, 'SECTEUR 3 SUBDIVISION 2 DES PERSONNES MORALES - MARRAKECH', '', 11123, 20, 1),
(11148, 'SECTEUR 3 SUBDIVISION 3 DES PERSONNES MORALES DE MARRAKECH', '', 11146, 20, 1),
(11150, 'SECTION D\'ACCUEIL - EL KELAA DES SRAGHNAS', '', 11073, 40, 1),
(11151, 'SUBDIVISION POLYVALANTE - REHAMNA', '', 11059, 8, 1),
(11152, 'SECTEUR DE LA FISCALITE DES PERSONNES MORALES - REHAMNA', '', 11151, 20, 1),
(11153, 'SECTEUR DE LA FISCALITE DES PERSONNES PHYSIQUES - REHAMNA', '', 11151, 20, 1),
(11154, 'SUBDIVISION POLYVALENTE - EL HAOUZ', '', 11060, 8, 1),
(11155, 'SECTEUR POLYVALENT - TAHANAOUT', '', 11154, 20, 1),
(11156, 'SUBDIVISION POLYVALENTE - CHICHAOUA', '', 11060, 8, 1),
(11157, 'SECTION RESTITUTION IR/SOURCE - HAY MOHAMMADI GUELIZ TARGA', '', 11100, 36, 1),
(11158, 'SECTION DU LOGEMENT SOCIAL ET CONTRIBUTION TVA - MEDINA/SIDIYOUSSEF BEN ALI', '', 11110, 40, 1),
(11159, 'SECTION DE SURVEILLANCE - ESSAOUIRA', '', 11064, 40, 1),
(11160, 'SECTEUR DE LA FISCALITE DES PROFESSIONNELS - ESSAOUIRA', '', 11062, 20, 1),
(11161, 'SECTION D\'ACCUEIL - ESSAOUIRA', '', 11062, 40, 1),
(11162, 'SECTION DU RECOUVREMENT FORCE - EL KELAA DES SRAGHNAS', '', 11078, 33, 1),
(11163, 'SECTION DE LA COMPTABILITE - EL KELAA DES SRAGHNAS', '', 11078, 24, 1),
(11164, 'SECTION DE CONTROLE DE L\'IR/PF ET DES INSUFFISANCES DES PRIX - EL KELAA DES SRAGHNAS', '', 11078, 40, 1),
(11165, 'SECTION DU RECOUVREMENT FORCE - ESSAOUIRA', '', 11065, 33, 1),
(11166, 'SECTION DE LA COMPTABILITE - ESSAOUIRA', '', 11065, 24, 1),
(11167, 'SECTION DU RECOUVREMENT FORCE - BENGUERIR', '', 11025, 33, 1),
(11168, 'SECTION DE LA COMPTABILITE - BENGUERIR', '', 11025, 24, 1),
(11169, 'SECTION DE CONTROLE DE L\'IR/PF ET DES INSUFFISANCES DES PRIX - BENGUERIR', '', 11025, 40, 1),
(11170, 'BUREAU DES RESSOURCES HUMAINES - MARRAKECH', '', 11005, 15, 1),
(11171, 'BUREAU DU BUDGET ET DES EQUIPEMENTS - MARRAKECH', '', 11005, 15, 1),
(11172, '2EME SERVICE REGIONAL DES VERIFICATIONS - MARRAKECH', '', 11000, 6, 1),
(11173, 'BRIGADE 3 - SERVICE 1 DES VERIFICATIONS - MARRAKECH', '', 11055, 10, 1),
(11174, 'BRIGADE 3 - SERVICE 2 DES VERIFICATIONS - MARRAKECH', '', 11172, 10, 1),
(11999, 'SECTEUR DE LA FISCALITE DES GRANDES ENTREPRISES DE MARRAKECH', '', 11008, 20, 1),
(9042, 'SECTEUR 1 DE LA FISCALITE DES PARTICULIERS SAFI', '', 9015, 20, 1),
(9047, 'SECTEUR - FISCALITE -PERSONNES MORALES SAFI', '', 9014, 20, 1),
(9055, 'SECTEUR 3 DE LA FISCALITE DES PARTICULIERS SAFI', '', 9015, 20, 1),
(9062, '3EME SECTEUR DE LA FISCALITE DES PROFESSIONNELS - SAFI', '', 9014, 20, 1),
(9063, '1ER SECTEUR DE LA FISCALITE DES PROFESSIONNELS - SAFI', '', 9014, 20, 1),
(9064, '2EME SECTEUR DE LA FISCALITE DES PROFESSIONNELS - SAFI', '', 9014, 20, 1),
(9065, 'SECTEUR 2 DE LA FISCALITE DES PARTICULIERS SAFI', '', 9015, 20, 1),
(9067, '9067-BUREAU CHARGE DU CONTROLE - SAFI', '', 9013, 12, 1),
(9068, 'SECTION DU RECOUVREMENT FORCE - SAFI', '', 9025, 33, 1),
(9078, 'BUREAU D\'ACCUEIL ET DE COORDINATION SAFI', '', 9013, 13, 1),
(9079, 'SECTEUR DE LA FISCALITE DES PERSONNES PHYSIQUES DES PROFESSIONNELS RNR/RNS - SAFI', '', 9014, 20, 1),
(9080, 'SECTEUR POLYVALENT DE YOUSSOUFIA', '', 9089, 20, 1),
(9081, 'SECTION DE LA COMPTABILITE - SAFI', '', 9025, 24, 1),
(9085, 'SECTEUR POLYVALENT - CHEMAIAA', '', 9089, 20, 1),
(9086, 'SECTION DE CONTROLE DE L\'IR/PF - SAFI', '', 9067, 40, 1),
(9087, 'SECTION DE CONTROLE DES INSUFFISANCES DES PRIX - SAFI', '', 9067, 40, 1),
(9089, 'SUBDIVISION POLYVALENTE - YOUSSOUFIA', '', 9013, 8, 1),
(9013, 'SERVICE D\'ASSIETTE - SAFI', '', 11000, 3, 1),
(9014, 'SUBDIVISION DE LA FISCALITE DES PERSONNES MORALES ET DES PROFESSIONNELS - SAFI', '', 9013, 8, 1),
(9015, 'SUBDIVISION DE LA FISCALITE DES PARTICULIERS SAFI', '', 9013, 8, 1),
(9016, 'SECTION DES EXONERATIONS ET DU REMBOURSEMENT - SAFI', '', 9014, 34, 1),
(9022, '9022-BUREAU D ENREGISTREMENT ET DU TIMBRE - SAFI', '', 9013, 16, 1),
(9025, 'RECETTE DE L\'ADMINISTRATION FISCALE SAFI', '', 11120, 19, 1),
(100012, 'CENTRE REGIONAL D\'INVESTISSEMENT -DRI MARRAKECH', '', 11000, 40, 0),
(11106, 'RECETTE DE L\'ADMINISTRATION FISCALE TSAVA ET TIMBRES MARRAKECH', '', 11120, 19, 0),
(110251, '110251-RECETTE DE L\'ADMINISTRATION FISCALE DE BENGUERIR (TTES ATT)', '', 11059, 19, 0),
(110781, '110781 - RECETTE DE L\'ADMINISTRATION FISCALE EL KELAA DES SRAGHNAS ( B.TOUTES ATTRIBUTIONS)', '', 11059, 19, 0),
(110991, 'RECETTE DE L\'ADMINISTRATION FISCALE MARRAKECH ALLAL ELFASSI', '', 11099, 19, 0);

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

DROP TABLE IF EXISTS `ville`;
CREATE TABLE IF NOT EXISTS `ville` (
  `codeV` int(11) NOT NULL,
  `nomVFr` varchar(254) DEFAULT NULL,
  `nomVAr` varchar(254) DEFAULT NULL,
  `codeR` int(11) DEFAULT NULL,
  PRIMARY KEY (`codeV`),
  KEY `FK_association6` (`codeR`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`codeV`, `nomVFr`, `nomVAr`, `codeR`) VALUES
(1, 'Afourar', 'أفورار', 5),
(2, 'Agadir', 'أكادير', 9),
(3, 'Agdz', 'اݣدز', 8),
(4, 'Aghbala', 'اغبالة', 5),
(5, 'Aghbalou', 'اغبالو', 8),
(6, 'Agouraï', 'أݣوراي', 3),
(7, 'Aguelmous', 'أكلموس', 5),
(8, 'Ahfir', 'أحفير', 2),
(9, 'Aïn Bni Mathar', 'عين بني مطهر', 2),
(10, 'Ain Cheggag', 'عين الشكاك', 3),
(11, 'Aïn Dorij', 'عين دريج', 1),
(12, 'Aïn El Aouda', 'عين العودة', 4),
(13, 'Aïn Erreggada', 'عين الرݣادة', 2),
(14, 'Aïn Harrouda', 'عين حرودة', 6),
(15, 'Aïn Jemaa', 'عين الجمعة', 3),
(16, 'Aïn Karma', 'عين كرمة', 3),
(17, 'Aïn Leuh', 'عين اللوح', 3),
(18, 'Aïn Taoujdate', 'عين تاوجطات', 3),
(19, 'Aït Baha', 'أيت باها', 9),
(20, 'Aït Boubidmane', 'أيت بوبيدمان', 3),
(21, 'Aït Daoud', 'أيت داود', 7),
(22, 'Aït Iaaza', 'أيت إيعزة', 9),
(23, 'Aït Ishaq', 'أيت إسحاق', 5),
(24, 'Aït Melloul', 'أيت ملول', 9),
(25, 'Aït Ourir', 'أيت أورير', 7),
(26, 'Ajdir (province d\'Al Hoceïma)', 'أجدير ( عمالة الحسيمة )', 1),
(27, 'Ajdir (province de Taza)', 'أجدير ( عمالة تازة )', 3),
(28, 'Akka', 'أقا', 9),
(29, 'Aklim', 'أكليم', 2),
(30, 'Aknoul', 'أكنول', 3),
(31, 'Al Aaroui', 'العروي', 2),
(32, 'Al Hoceïma', 'الحسيمة', 1),
(33, 'Alnif', 'ألنيف', 8),
(34, 'Amalou Ighriben', 'املو إغربن', 5),
(35, 'Amizmiz', 'أمزميز', 7),
(36, 'Aoufous', 'أوفوس', 8),
(37, 'Aoulouz', 'أولوز', 9),
(38, 'Aourir', 'أورير', 9),
(39, 'Arbaoua', 'عرباوة', 4),
(40, 'Arfoud (ou Erfoud)', 'أرفود', 8),
(41, 'Assa', ' أسا', 10),
(42, 'Assahrij', 'السهريج', 7),
(43, 'Assilah', 'أصيلة', 1),
(44, 'Azemmour', 'أزمور', 6),
(45, 'Azilal', 'أزيلال', 5),
(46, 'Azrou', 'أزرو', 3),
(47, 'Bab Berred', 'باب برد', 1),
(48, 'Bab Taza', 'باب تازة', 1),
(49, 'Bejaad', 'أبي الجعد', 5),
(50, 'Ben Ahmed', 'ابن أحمد', 6),
(51, 'Ben Guerir', 'ابن جرير', 7),
(52, 'Ben Slimane', 'بنسليمان', 6),
(53, 'Ben Taïeb', 'ابن الطيب', 2),
(54, 'Ben Yakhlef', 'بني يخلف', 6),
(55, 'Beni Mellal', 'بني ملال', 5),
(56, 'Berkane', 'بركان', 2),
(57, 'Berrechid', 'برشيد', 6),
(58, 'Bhalil', 'البهاليل', 3),
(59, 'Biougra', 'بيوڭرى', 9),
(60, 'Bni Ansar', 'بني انصار', 2),
(61, 'Bni Bouayach', 'بني بوعياش', 1),
(62, 'Bni Chiker', 'بني شيكر', 2),
(63, 'Bni Drar', 'بني درار', 2),
(64, 'Bni Hadifa', 'بني حذيفة ( أيث حذيفة )', 1),
(65, 'Bni Tadjite', 'بني تدجيت', 2),
(66, 'Bouanane', 'بوعنان', 2),
(67, 'Bouarfa', 'بوعرفة', 2),
(68, 'Boudnib', 'بودنيب', 8),
(69, 'Bouguedra', 'بوݣدرة', 7),
(70, 'Bouhdila', 'بوهديلة', 2),
(71, 'Bouizakarne', ' بويزكارن', 10),
(72, 'Boujdour', ' بوجدور', 11),
(73, 'Boujniba', 'بوجنيبة', 5),
(74, 'Boulanouare', 'بولنوار', 5),
(75, 'Boulemane', 'بولمان', 3),
(76, 'Boumalne Dadès', 'بومالن دادس', 8),
(77, 'Boumia', 'بومية', 8),
(78, 'Bouskoura', 'بوسكورة', 6),
(79, 'Bouznika', 'بوزنيقة', 6),
(80, 'Bouzthate', 'بوزطاط ( تنغاية )', 1),
(81, 'Bradia', 'برادية', 5),
(82, 'Brikcha', 'بريكشة', 1),
(83, 'Bzou', 'بزو', 5),
(84, 'Casablanca', 'الدار البيضاء', 6),
(85, 'Chefchaouen', 'شفشاون', 1),
(86, 'Chichaoua', 'شيشاوة', 7),
(87, 'Dakhla', 'الداخلة', 12),
(88, 'Dar Bni Karrich', 'دار بن كريش', 1),
(89, 'Dar Chaoui', 'دار شاوي', 1),
(90, 'Dar El Kebdani', 'دار الكبداني', 2),
(91, 'Dar Gueddari', 'دار الݣداري', 4),
(92, 'Dar Ould Zidouh', 'دار ولد زيدوح', 5),
(93, 'Dcheïra El Jihadia', 'الدشيرة الجهادية', 9),
(94, 'Debdou', 'دبدو', 2),
(95, 'Demnate', 'دمنات', 5),
(96, 'Deroua', 'الدروة', 6),
(97, 'Drargua', 'الدراركة', 9),
(98, 'Driouch', 'الدريوش', 2),
(99, 'Echemmaia', 'الشماعية', 7),
(100, 'El Aïoun Sidi Mellouk', 'العيون سدس ملوك', 2),
(101, 'El Borouj', 'البروج ', 6),
(102, 'El Gara', 'الݣارة', 6),
(103, 'El Hajeb', 'الحاجب', 3),
(104, 'El Hanchane', 'الحنشان', 7),
(105, 'El Jadida', 'الجديدة', 6),
(106, 'El Kbab', 'القباب', 5),
(107, 'El Kelaa des Sraghnas', 'قلعة السراغنة', 7),
(108, 'El Ksiba', 'القصيبة', 5),
(109, 'El Mansouria', 'المنصورية', 6),
(110, 'El Marsa', ' المرسى', 11),
(111, 'El Menzel', 'المنزل', 3),
(112, 'El Ouatia', ' الوطية', 10),
(113, 'Errachidia', 'الرشيدية', 8),
(114, 'Er-Rich', 'الريش', 8),
(115, 'Essaouira', 'الصويرة', 7),
(116, 'Es-Semara (ou Semara ou Smara)', 'سمارة', 11),
(117, 'Fam El Hisn', 'فم الحصن', 9),
(118, 'Farkhana', 'فرخانة', 2),
(119, 'Fès', 'فاس', 3),
(120, 'Figuig', 'فݣيݣ', 2),
(121, 'Fnideq', 'الفنيدق', 1),
(122, 'Foum Jamaa', 'فم الجمعة', 5),
(123, 'Foum Zguid', 'فم زݣيد', 9),
(124, 'Fquih Ben Salah', 'الفقيه بن صالح', 5),
(125, 'Ghafsaï', 'غفساي', 3),
(126, 'Ghmate', 'غمات', 7),
(127, 'Goulmima', 'كلميمة', 8),
(128, 'Gourrama', 'كرامة', 8),
(129, 'Guelmim', ' كلميم', 10),
(130, 'Guercif', 'جرسيف', 2),
(131, 'Gueznaïa', 'اكزناية', 1),
(132, 'Guigou', 'كيكو', 3),
(133, 'Guisser', 'ݣيسر', 6),
(134, 'Had Bouhssoussen', 'أحد بوحسوسن', 5),
(135, 'Had Kourt', 'حد كورت', 4),
(136, 'Had Oued Ifrane', 'واد إيفران', 3),
(137, 'Haj Kaddour', 'الحاج قدور', 3),
(138, 'Hattane', 'حطان', 5),
(139, 'Ifrane', 'إفران', 3),
(140, 'Ifrane Atlas Saghir', ' إفران الأطلس الصغير', 10),
(141, 'Ighoud', 'إيغود', 7),
(142, 'Ihddaden', 'إيحدادن', 2),
(143, 'Imintanoute', 'إمنتانوت', 7),
(144, 'Imouzzer Kandar', 'إيموزار كندر', 3),
(145, 'Imouzzer Marmoucha', 'إموزار مرموشة', 3),
(146, 'Imzouren', 'إمزورن', 1),
(147, 'Inezgane', 'إنزكان', 9),
(148, 'Irherm', 'إغرم', 9),
(149, 'Issaguen', 'إساكن', 1),
(150, 'Itzer', 'إتزار', 8),
(151, 'Jaadar', 'جعدار', 2),
(152, 'Jamaat Shaim', 'جمعة سحيم', 7),
(153, 'Jebha', 'جبهة', 1),
(154, 'Jerada', 'جرادة', 2),
(155, 'Jorf', 'جرف', 8),
(156, 'Jorf El Melha', 'جرف الملحة', 4),
(157, 'Kalaat M\'Gouna (ou El Kelaa des Mgouna)', 'قلعة مݣونة', 8),
(158, 'Karia (province de Tétouan)', 'قرية (عمالة تطوان )', 1),
(159, 'Karia (province d\'El Jadida)', 'قرية (عمالة الجديدة )', 6),
(160, 'Karia Ba Mohamed', 'قرية با محمد', 3),
(161, 'Kariat Arekmane', 'قرية أركمان', 2),
(162, 'Kasba Tadla', 'قصبة تادلة', 5),
(163, 'Kassita', 'كاسيطا', 2),
(164, 'Kattara', 'القطارة', 7),
(165, 'Kehf Nsour', 'كهف النسور', 5),
(166, 'Kénitra', 'القنيطرة', 4),
(167, 'Kerouna', 'كرونة', 2),
(168, 'Kerrouchen', 'كروشن', 5),
(169, 'Khémis Sahel', 'خميس سهل', 1),
(170, 'Khémisset', 'الخميسات', 4),
(171, 'Khénichet', 'الخنيشات', 4),
(172, 'Khénifra', 'خنيفرة', 5),
(173, 'Khouribga', 'خريبكة', 5),
(174, 'Ksar El Kébir', 'القصر الكبير', 1),
(175, 'Laakarta', 'العكارطة', 7),
(176, 'Laâounate', 'العونات', 6),
(177, 'Laattaouia', 'العطاوية', 7),
(178, 'Laayoune', 'العيون', 11),
(179, 'Lagouira', ' الكويرة', 12),
(180, 'Lahraouyine', 'الهراويين', 6),
(181, 'Lakhsas', ' الأخصاص', 10),
(182, 'Lakouablia', 'الكوابلية', 7),
(183, 'Lalla Mimouna', 'لالة ميمونة', 4),
(184, 'Lalla Takarkoust', 'للا تاكركوست', 7),
(185, 'Larache', 'العرائش', 1),
(186, 'Lbir Jdid', 'لبير الجديد', 6),
(187, 'Loualidia (ou Oualidia)', 'الوليدية', 6),
(188, 'Loulad', 'الاولاد', 6),
(189, 'Lqliaa', 'القليعة', 9),
(190, 'Maaziz', 'معازيز', 4),
(191, 'Madagh', 'مداغ', 2),
(192, 'Marrakech', 'مراكش', 7),
(193, 'Martil', 'مرتيل', 1),
(194, 'Massa', 'ماسة', 9),
(195, 'M\'Diq', 'المضيق', 1),
(196, 'Mechra Bel Ksiri', 'مشرع بلقصيري', 4),
(197, 'Médiouna', 'مديونة', 6),
(198, 'Mehdya', 'المهدية', 4),
(199, 'Meknès', 'مكناس', 3),
(200, 'M\'Haya', 'مهاية', 3),
(201, 'Midar', 'ميضار', 2),
(202, 'Midelt', 'ميدلت', 8),
(203, 'Missour', 'ميسور', 3),
(204, 'Mohammédia', 'المحمدية', 6),
(205, 'Moqrisset', 'مقريسات', 1),
(206, 'Moulay Abdallah', 'مولاي عبد الله', 6),
(207, 'Moulay Ali Chérif (ou Rissani)', 'مولاي علي الشريف', 8),
(208, 'Moulay Bouazza', 'مولاي بوعزة', 5),
(209, 'Moulay Bousselham', 'مولاي بوسلهام', 4),
(210, 'Moulay Brahim', 'مولاي إبراهيم', 7),
(211, 'Moulay Driss Zerhoun', 'مولاي إدريس زرهون', 3),
(212, 'M\'Rirt', 'مريرت', 5),
(213, 'Nador', 'الناظور', 2),
(214, 'Naïma', 'النعيمة', 2),
(215, 'Nouaceur', 'النواصر', 6),
(216, 'Ouaouizeght', 'واويزغت', 5),
(217, 'Ouarzazate', 'ورزازات', 8),
(218, 'Oued Amlil', 'واد أمليل', 3),
(219, 'Oued Heïmer', 'واد الحيمر', 2),
(220, 'Oued Laou', 'واد لاو', 1),
(221, 'Oued Zem', 'وادي زم', 5),
(222, 'Ouezzane', 'وزان', 1),
(223, 'Ouislane', 'ويسلان', 3),
(224, 'Oujda', 'وجدة', 2),
(225, 'Oulad Abbou', 'اولاد عبو', 6),
(226, 'Oulad Amrane', 'أولاد عمران', 6),
(227, 'Oulad Ayad', 'أولاد عياد', 5),
(228, 'Oulad Berhil', 'أولاد برحيل', 9),
(229, 'Oulad Frej', 'أولاد فرج', 6),
(230, 'Oulad Ghadbane', 'اولاد غدبان', 6),
(231, 'Oulad H\'Riz Sahel', 'اولاد احريز', 6),
(232, 'Oulad M\'Barek', 'أولاد امبارك', 5),
(233, 'Oulad Saïd', 'اولاد سعيد', 6),
(234, 'Oulad Tayeb', 'اولاد الطيب', 3),
(235, 'Oulad Teïma (Houara)', 'أولاد تايمة (هوارة)', 9),
(236, 'Oulad Yaïch', 'أولاد ايعيش', 5),
(237, 'Oulad Zbaïr', 'أولاد زباير', 3),
(238, 'Oulmès', 'ولماس', 4),
(239, 'Oum El Guerdane', 'أم الݣردان', 9),
(240, 'Ounagha', 'اوناغا', 7),
(241, 'Outat El Haj', 'اوطاط الحاج', 3),
(242, 'Rabat', 'الرباط', 4),
(243, 'Ras El Aïn', 'رأس العين', 6),
(244, 'Ras El Ma', 'راس الماء', 2),
(245, 'Ribate El Kheïr', 'رباط الخير', 3),
(246, 'Rommani', 'الرماني', 4),
(247, 'Sabaa Aiyoun', 'سبع عيون', 3),
(248, 'Safi', 'أسفي', 7),
(249, 'Saïdia', 'السعيدية', 2),
(250, 'Salé', 'سلا', 4),
(251, 'Sebt El Guerdane', 'سبت الݣردان', 9),
(252, 'Sebt El Maarif', 'سبت المعرف', 6),
(253, 'Sebt Gzoula', 'سبت ݣزولة', 7),
(254, 'Sebt Jahjouh', 'سبت جحجوح', 3),
(255, 'Sefrou', 'صفرو', 3),
(256, 'Selouane', 'سلوان', 2),
(257, 'Settat', 'سطات', 6),
(258, 'Sid L\'Mokhtar', 'سيد المختار', 7),
(259, 'Sid Zouin', 'سيدي الزوين', 7),
(260, 'Sidi Abdallah Ghiat', 'سيدي عبد الله غيات', 7),
(261, 'Sidi Addi', 'سيدي عدي', 3),
(262, 'Sidi Ahmed', 'سيدي احمد', 7),
(263, 'Sidi Ali Ban Hamdouche', 'سيدي علي بن حمدوش', 6),
(264, 'Sidi Allal El Bahraoui', ' سيدي علال البحراوي', 4),
(265, 'Sidi Allal Tazi', 'سيدي علال التازي', 4),
(266, 'Sidi Bennour', 'سيدي بنور', 6),
(267, 'Sidi Bou Othmane', 'سيدي بو عثمان', 7),
(268, 'Sidi Boubker', 'سيدي بوبكر', 2),
(269, 'Sidi Bouknadel', 'سيدي بوقنادل', 4),
(270, 'Sidi Bouzid', 'سيدي بوزيد', 6),
(271, 'Sidi Hajjaj Oulad Mrah', 'سيدي حجاج أولاد امراح', 6),
(272, 'Sidi Ifni', ' سيدي إفني', 10),
(273, 'Sidi Jaber', 'سيدي جابر', 5),
(274, 'Sidi Kacem', 'سيدي قاسم', 4),
(275, 'Sidi Lyamani', 'سيدي اليماني', 1),
(276, 'Sidi Rahhal', 'سيدي رحال', 7),
(277, 'Sidi Rahhal Chataï', 'سيدي رحال شاطئ', 6),
(278, 'Sidi Slimane', 'سيدي سليمان', 4),
(279, 'Sidi Slimane Echcharraa', 'سيدي سليمان الشراعة', 2),
(280, 'Sidi Smaïl', 'سيدي إسماعيل', 6),
(281, 'Sidi Taïbi', 'سيدي الطيبي', 4),
(282, 'Sidi Yahya El Gharb', 'سيدي يحيى الغرب', 4),
(283, 'Skhirate', 'الصخيرات', 4),
(284, 'Skhour Rehamna', 'صخور رحمنا', 7),
(285, 'Skoura', 'سكورة', 8),
(286, 'Smimou', 'سميمو', 7),
(287, 'Soualem', 'السوالم', 6),
(288, 'Souk El Arbaâ', 'سوق الأربعاء', 4),
(289, 'Souk Sebt Oulad Nemma', 'أولاد النمة', 5),
(290, 'Tabounte', 'تبنت', 8),
(291, 'Tafetachte', 'تفتاشت', 7),
(292, 'Tafraout', 'تافراوت', 9),
(293, 'Tafrisset', 'تفرسيت', 2),
(294, 'Taghjijt', ' تاغجيجت', 10),
(295, 'Tahannaout', 'تحناوت', 7),
(296, 'Tahla', 'تاهلة', 3),
(297, 'Taïnaste', 'تاينست', 3),
(298, 'Taliouine', 'تاليوين', 9),
(299, 'Talmest', 'تالمست', 7),
(300, 'Talsint', 'تالسينت', 2),
(301, 'Tamallalt', 'تملالت', 7),
(302, 'Tamanar', 'تمنار', 7),
(303, 'Tamassint', 'تماسينت', 1),
(304, 'Tamegroute', 'تمكروت', 8),
(305, 'Tameslouht', 'تمصلوحت', 7),
(306, 'Tanger', 'طنجة', 1),
(307, 'Tan-Tan', ' طانطان', 10),
(308, 'Taounate', 'تاونات', 3),
(309, 'Taourirt', 'تاوريرت', 2),
(310, 'Tarfaya', ' طرفاية', 11),
(311, 'Targuist', 'تارجيست', 1),
(312, 'Taroudant', 'تارودانت', 9),
(313, 'Tata', 'طاطا', 9),
(314, 'Taza', 'تازة', 3),
(315, 'Taznakht', 'تازناخت', 8),
(316, 'Témara', 'تمارة', 4),
(317, 'Temsia', 'التمسية', 9),
(318, 'Tendrara', 'تندرارة', 2),
(319, 'Tétouan', 'تطوان', 1),
(320, 'Thar Es Souk', 'ظهر السوق', 3),
(321, 'Tidass', 'تيداس', 4),
(322, 'Tiflet', 'تيفلت', 4),
(323, 'Tighassaline', 'تغسالين', 5),
(324, 'Tighza', 'تيغزة', 5),
(325, 'Timahdite', 'تمحضيت', 3),
(326, 'Tinejdad', 'تنجداد', 8),
(327, 'Tinghir', 'تنغير', 8),
(328, 'Tissa', 'تيسة', 3),
(329, 'Tit Mellil', 'تيط مليل', 6),
(330, 'Tizi Ouasli', 'تيزي وسلي', 3),
(331, 'Tiznit', 'تيزنيت', 9),
(332, 'Tiztoutine', 'تيزطوتين', 2),
(333, 'Touima', 'تويمة', 2),
(334, 'Touissit', 'تويسيت', 2),
(335, 'Toulal', 'تولال', 3),
(336, 'Tounfite', 'تونفيت', 8),
(337, 'Youssoufia', 'اليوسفية', 7),
(338, 'Zag', ' الزاك', 10),
(339, 'Zagora', 'زاكورة', 8),
(340, 'Zaïda', ' زايدة', 8),
(341, 'Zaïo', 'زايو', 2),
(342, 'Zaouïat Bougrine', 'زاوية بوكرين', 3),
(343, 'Zaouïat Cheikh', 'زاوية الشيخ', 5),
(344, 'Zeghanghane', 'أزغنغان', 2),
(345, 'Zemamra', 'زمامرة', 6),
(346, 'Zirara', 'زيرارة', 4),
(347, 'Zoumi', 'زومي', 1),
(348, 'Zrarda', 'زراردة', 3),
(349, 'Bni Smir', 'بني سمير', 5),
(350, 'Ida ou Gnidif', 'إداوكنظيف', 9),
(351, 'Tizounine', 'تيزونين', 9),
(352, 'Arbaa Sahel', 'أربعاء الساحل', 9),
(353, 'Askaouen', 'أسكاون', 9),
(354, 'Imlil', 'إمليل', 7),
(355, 'Touama', 'التوامة', 7),
(356, 'Tiourassine', 'تيوراسين', 8),
(357, 'Douar Oulad Khlifa', 'دوار ولاد خليفة', 7),
(358, 'Nfifa', 'نفيفة', 7),
(359, 'Tifni', 'تيفني', 5),
(360, 'Tanalt', 'تنالت', 9),
(1000, 'Alger', 'الجزائر', 100),
(2000, 'Paris', 'باريس', 200),
(2001, 'Antibis', 'أنتيب', 201);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

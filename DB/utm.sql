-- phpMyAdmin SQL Dump
-- version 5.0.4deb2ubuntu5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-03-2022 a las 01:55:34
-- Versión del servidor: 8.0.28-0ubuntu0.21.10.3
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `utm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `idArticulo` bigint NOT NULL,
  `tipoCRL` text NOT NULL,
  `titulo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombreCRL` text NOT NULL,
  `estado` text NOT NULL,
  `fechaedicion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tipoNI` text NOT NULL,
  `volumen` text NOT NULL,
  `paginas` text NOT NULL,
  `anyo` text NOT NULL,
  `issnisbn` text NOT NULL,
  `doi` text NOT NULL,
  `comprobante` text NOT NULL,
  `indexada` text NOT NULL,
  `issue` text NOT NULL,
  `editores` text NOT NULL,
  `ciudad` text NOT NULL,
  `pais` text NOT NULL,
  `editorial` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`idArticulo`, `tipoCRL`, `titulo`, `nombreCRL`, `estado`, `fechaedicion`, `tipoNI`, `volumen`, `paginas`, `anyo`, `issnisbn`, `doi`, `comprobante`, `indexada`, `issue`, `editores`, `ciudad`, `pais`, `editorial`) VALUES
(4, '1', 'Articulo 1', 'uno', 'Publicado', '2022-01-25', '1', '1', '5-8', '2022', '22112212', 'doi1', 'creado', 'no', '21222', 'UTM', 'Oaxaca de Juárez', 'México', 'UTM'),
(5, '1', 'Articulo 2', 'uno', 'Publicado', '2022-01-01', '1', '1', '10-22', '2022', '123123', 'doi2', 'existe', 'si', '2112', 'UTM', 'Huajuapan de León', 'México', 'UTM'),
(6, '1', '¿Por qué necesitamos estudiar?', '¿Por qué necesitamos estudiar?', 'publicado', '2012-04-01', '1', '1', '10-20', '2012', '11', 'www.publi-gtx.com', 'Registro', '98256', '100', 'R&R', 'Oaxaca', 'México', 'Publicaciones GTX'),
(7, '1', 'Misterios de la UTM', 'Misterios de la UTM', 'publicado', '2013-05-02', '1', '1', '10-20', '2012', '1', 'www.revista-gtx.com', 'Registro', '98256', '100', 'R&R', 'Oaxaca', 'México', 'Revista GTX');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articuloYprofesor`
--

CREATE TABLE `articuloYprofesor` (
  `idAyP` bigint NOT NULL,
  `idProfesor` bigint NOT NULL,
  `idArticulo` bigint NOT NULL,
  `posicion` int NOT NULL,
  `validado` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articuloYprofesor`
--

INSERT INTO `articuloYprofesor` (`idAyP`, `idProfesor`, `idArticulo`, `posicion`, `validado`) VALUES
(5, 5, 4, 1, 1),
(6, 1, 4, 1, 1),
(7, 5, 5, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `idCarrera` bigint NOT NULL,
  `codigoCarrera` text NOT NULL,
  `nombreCarrera` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idInstituto` bigint NOT NULL,
  `siglas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`idCarrera`, `codigoCarrera`, `nombreCarrera`, `idInstituto`, `siglas`) VALUES
(1, '002', 'Ingeniería en Computación', 1, 'IC'),
(6, '001', 'Ingeniería en Mecatrónica', 2, 'IM'),
(7, '001', 'Ingeniería en Electrónica', 2, 'IE'),
(11, '003', 'Ingeniería en Diseño', 8, 'ID'),
(12, '005', 'Licenciatura en Ciencias Empresariales', 11, 'LCE'),
(13, '008', 'Ingeniería en Alimentos', 12, 'IA'),
(14, '004', 'Licenciatura en Matemáticas Aplicadas', 7, 'LMA'),
(15, '013', 'Ingeniería Industrial', 17, 'II'),
(16, '011', 'Estudios de Nuevos Materiales', 15, 'ENM'),
(17, '004', 'Ingeniería en Física Aplicada', 7, 'IFA'),
(18, '013', 'Ingeniería en Mecánica Automotriz', 17, 'IMA'),
(19, '003', 'Ingeniería Civil', 8, 'ICV'),
(20, '100', 'Maestría en Diseño de Modas', 18, 'MDMO'),
(21, '100', 'Maestría en Diseño de Muebles', 18, 'MDMU'),
(22, '100', 'Maestría en Medios Interactivos', 18, 'MMI'),
(23, '100', 'Maestría en Ciencias de Materiales', 18, 'MCM'),
(24, '100', 'Maestría en Modelación Matemática', 18, 'MMM'),
(25, '100', 'Maestría en Robótica', 18, 'MR'),
(26, '100', 'Maestría en Administración de Negocios', 18, 'MAN'),
(27, '100', 'Maestría en Tecnología Avanzada de Manufactura', 18, 'MTAM'),
(28, '100', 'Maestría en Tecnologías de Cómputo Aplicado', 18, 'MTCA'),
(29, '100', 'Maestría en Ciencias: Productos Naturales y Alimentos', 18, 'MCPNA'),
(30, '100', 'Maestría en Electrónica Opción: Sistemas Inteligentes Aplicados', 18, 'MESIA'),
(31, '100', 'Doctorado en Robótica', 18, 'DR'),
(32, '100', 'Doctorado en Tecnologías de Cómputo Aplicado', 18, 'DTCA'),
(33, '100', 'Doctorado en Modelación Matemática', 18, 'DMM'),
(34, '100', 'Doctorado en Electrónica, Opción: Sistemas Inteligentes Aplicados', 18, 'DESIA'),
(35, '100', 'Licenciatura en Estudios Mexicanos', 18, 'LEM'),
(36, '100', 'Maestría en Sistemas Distribuidos', 18, 'MSD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institutos`
--

CREATE TABLE `institutos` (
  `idInstituto` bigint NOT NULL,
  `nombreInstituto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `codigoInstituto` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `institutos`
--

INSERT INTO `institutos` (`idInstituto`, `nombreInstituto`, `codigoInstituto`) VALUES
(1, 'Instituto de Computación', '002'),
(2, 'Instituto de Electrónica y Mecatrónica', '001'),
(7, 'Instituto de Física y Matemáticas', '004'),
(8, 'Instituto de Diseño', '003'),
(9, 'vice-rectoria académica', '000'),
(11, 'Instituto de Ciencias Sociales y Humanidades', '005'),
(12, 'Instituto de Agroindustrias', '008'),
(13, 'Instituto de Hidrología', '009'),
(14, 'Instituto de Minería', '010'),
(15, 'Centro de Estudios de Nuevos Materiales', '011'),
(16, 'Centro de Idiomas', '012'),
(17, 'Instituto de Ingeniería Industrial y Automotriz', '013'),
(18, 'Posgrado', '100');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` bigint NOT NULL,
  `idPlan` bigint NOT NULL,
  `semestre` int NOT NULL,
  `nombreMateria` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `idPlan`, `semestre`, `nombreMateria`) VALUES
(1, 1, 5, 'Materia 1'),
(2, 2, 3, 'Materia 2'),
(3, 1, 1, 'Materia 3'),
(4, 4, 1, 'Materia 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE `periodos` (
  `idPeriodo` bigint NOT NULL,
  `nombrePeriodo` text NOT NULL,
  `inicio` text NOT NULL,
  `fin` text NOT NULL,
  `actual` tinyint(1) NOT NULL,
  `avance1` text NOT NULL,
  `avance2` text NOT NULL,
  `avance3` text NOT NULL,
  `avanceFinal` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`idPeriodo`, `nombrePeriodo`, `inicio`, `fin`, `actual`, `avance1`, `avance2`, `avance3`, `avanceFinal`) VALUES
(1, 'A', '2021', '2022', 1, 'avance 1', 'avance 2', 'avance 3', 'avance final'),
(2, 'B', '2021', '2022', 0, 'avance 1', 'avance 2', 'avance 3', 'avance final');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `idPlan` bigint NOT NULL,
  `idCarrera` bigint NOT NULL,
  `nombrePlan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`idPlan`, `idCarrera`, `nombrePlan`) VALUES
(1, 1, 'Nuevo Plan'),
(2, 6, 'Nuevo Plan'),
(3, 7, 'Plan actual'),
(4, 1, 'Viejo Plan'),
(5, 6, 'Viejo Plan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `idProfesor` bigint NOT NULL,
  `nombres` text NOT NULL,
  `apellidoPaterno` text NOT NULL,
  `apellidoMaterno` text NOT NULL,
  `nombreApa` text NOT NULL,
  `correoProfesor` text NOT NULL,
  `password` text NOT NULL,
  `nivel` int NOT NULL,
  `idInstituto` bigint NOT NULL,
  `idCarrera` bigint NOT NULL,
  `grado` text NOT NULL,
  `idTipoProfesor` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`idProfesor`, `nombres`, `apellidoPaterno`, `apellidoMaterno`, `nombreApa`, `correoProfesor`, `password`, `nivel`, `idInstituto`, `idCarrera`, `grado`, `idTipoProfesor`) VALUES
(1, 'Profesor 1', 'Apellido Paterno 1', 'Apellido Materno 2', 'Prof 1', 'correo_profe_1@gmail.com', 'password01', 2, 8, 19, 'grado 1', 1),
(2, 'Profesor 2', 'Apellido Paterno 2', 'Apellido Materno 2', 'Prof 2', 'correo_profe_2@gmail.com', 'password02', 1, 12, 13, 'grado 2', 1),
(3, 'Profesor 3', 'Apellido Paterno 3', 'Apellido Materno 3', 'Prof 3', 'correo_profe_3@gmail.com', 'password03', 3, 2, 7, 'grado 3', 1),
(4, 'Profesor 4', 'Apellido Paterno 4', 'Apellido Materno 4', 'Prof 4', 'correo_profe_4@gmail.com', 'password04', 3, 2, 7, 'grado 4', 1),
(5, 'Axel Isaac', 'González', 'García', 'García González, A. I.', 'axldorian3@gmail.com', '$2a$10$ZQb5kaD2jYumz7aYwiNtrOAiGbJODyoW0WMA1UBhJXhvM/6IGQZoq', 1, 1, 1, 'Dr', 1),
(6, 'Isaac', 'Do', 'Rian', 'Do Rian, I.', 'axlfake3@gmail.com', '$2a$10$i8FE01P85a/RPWYSSL9RfOJWrjryvkinbrryZNXK28TD/hVOHO4eq', 1, 7, 17, 'MC', 1),
(7, 'Axel 2', 'Gonzalez', 'Garcia', 'García González, A. I.', 'isggga@gmail.com', '$2a$10$ui5NMHxqKvP9HBrqkalak.i7deiNo/u3wL5puhcNxbgYYGL3FQHwm', 4, 18, 25, 'Dr MC', 1),
(10, 'Sebastian', 'Gonzalez', 'Garcia', 'García González, S.', 'sebass@gmail.com', '$2a$10$EQWhfYcYLSw6p3ZRvFEW6eX2Yi4jrNHF7NmUvMLmRGijlbnu/7zO2', 4, 17, 18, 'Dr MC', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorYmateria`
--

CREATE TABLE `profesorYmateria` (
  `idProfesorYMateria` bigint NOT NULL,
  `idProfesor` bigint NOT NULL,
  `idMateria` bigint NOT NULL,
  `grupo` text NOT NULL,
  `anyo` int NOT NULL,
  `idPeriodo` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesorYmateria`
--

INSERT INTO `profesorYmateria` (`idProfesorYMateria`, `idProfesor`, `idMateria`, `grupo`, `anyo`, `idPeriodo`) VALUES
(1, 1, 1, 'A', 2021, 1),
(2, 2, 1, 'A', 2021, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoProfesor`
--

CREATE TABLE `tipoProfesor` (
  `idTipoProfesor` bigint NOT NULL,
  `nombreTipo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipoProfesor`
--

INSERT INTO `tipoProfesor` (`idTipoProfesor`, `nombreTipo`) VALUES
(1, 'Profesor-Investigador'),
(2, 'Catedra-Conacyt'),
(3, 'Posdoctorante-Conacyt'),
(4, 'Posdoctorante-PRODED');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`idArticulo`);

--
-- Indices de la tabla `articuloYprofesor`
--
ALTER TABLE `articuloYprofesor`
  ADD PRIMARY KEY (`idAyP`),
  ADD KEY `profesorValido` (`idProfesor`),
  ADD KEY `articuloValido` (`idArticulo`);

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`idCarrera`),
  ADD KEY `InstitutoValido` (`idInstituto`);

--
-- Indices de la tabla `institutos`
--
ALTER TABLE `institutos`
  ADD PRIMARY KEY (`idInstituto`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`),
  ADD KEY `PlanValido` (`idPlan`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`idPeriodo`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`idPlan`),
  ADD KEY `validacarrera` (`idCarrera`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`idProfesor`),
  ADD KEY `TipoProfesorValido` (`idTipoProfesor`);

--
-- Indices de la tabla `profesorYmateria`
--
ALTER TABLE `profesorYmateria`
  ADD PRIMARY KEY (`idProfesorYMateria`),
  ADD KEY `PeriodoValido` (`idPeriodo`),
  ADD KEY `profesorValid` (`idProfesor`),
  ADD KEY `MateriaValida` (`idMateria`);

--
-- Indices de la tabla `tipoProfesor`
--
ALTER TABLE `tipoProfesor`
  ADD PRIMARY KEY (`idTipoProfesor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `idArticulo` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `articuloYprofesor`
--
ALTER TABLE `articuloYprofesor`
  MODIFY `idAyP` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `idCarrera` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `institutos`
--
ALTER TABLE `institutos`
  MODIFY `idInstituto` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `idMateria` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `periodos`
--
ALTER TABLE `periodos`
  MODIFY `idPeriodo` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `planes`
--
ALTER TABLE `planes`
  MODIFY `idPlan` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `idProfesor` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `profesorYmateria`
--
ALTER TABLE `profesorYmateria`
  MODIFY `idProfesorYMateria` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipoProfesor`
--
ALTER TABLE `tipoProfesor`
  MODIFY `idTipoProfesor` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articuloYprofesor`
--
ALTER TABLE `articuloYprofesor`
  ADD CONSTRAINT `articuloValido` FOREIGN KEY (`idArticulo`) REFERENCES `articulos` (`idArticulo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `profesorValido` FOREIGN KEY (`idProfesor`) REFERENCES `profesores` (`idProfesor`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD CONSTRAINT `InstitutoValido` FOREIGN KEY (`idInstituto`) REFERENCES `institutos` (`idInstituto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `materias`
--
ALTER TABLE `materias`
  ADD CONSTRAINT `PlanValido` FOREIGN KEY (`idPlan`) REFERENCES `planes` (`idPlan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `validacarrera` FOREIGN KEY (`idCarrera`) REFERENCES `carreras` (`idCarrera`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `TipoProfesorValido` FOREIGN KEY (`idTipoProfesor`) REFERENCES `tipoProfesor` (`idTipoProfesor`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `profesorYmateria`
--
ALTER TABLE `profesorYmateria`
  ADD CONSTRAINT `MateriaValida` FOREIGN KEY (`idMateria`) REFERENCES `materias` (`idMateria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `PeriodoValido` FOREIGN KEY (`idPeriodo`) REFERENCES `periodos` (`idPeriodo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `profesorValid` FOREIGN KEY (`idProfesor`) REFERENCES `profesores` (`idProfesor`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

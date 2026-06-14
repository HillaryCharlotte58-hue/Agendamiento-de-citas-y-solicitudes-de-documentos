-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-06-2026 a las 18:35:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Agendar_Citas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(200) NOT NULL,
  `numero_paciente` varchar(200) NOT NULL,
  `tipo_de_servicio` varchar(200) NOT NULL,
  `id_usuario` int(200) NOT NULL,
  `fecha_hora` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `medico` varchar(200) NOT NULL,
  `especialidades` varchar(200) NOT NULL,
  `tipo_documento` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `numero_paciente`, `tipo_de_servicio`, `id_usuario`, `fecha_hora`, `medico`, `especialidades`, `tipo_documento`) VALUES
(3, '', 'programar\r\ncancelar\r\nconfirmar\r\nreasignar\r\ngenerar reporte\r\nrecordatorio\r\n', 1, '2026-01-01 17:00:00.000000', '', '', ''),
(4, '', '', 1, '2026-02-21 05:00:00.000000', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas_nueva`
--

CREATE TABLE `citas_nueva` (
  `id` int(11) NOT NULL,
  `cedula_usuario` varchar(50) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('Programada','Reprogramada','Cancelada') DEFAULT 'Programada',
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `citas_nueva`
--

INSERT INTO `citas_nueva` (`id`, `cedula_usuario`, `nombre_usuario`, `especialidad`, `fecha`, `hora`, `estado`, `fecha_registro`) VALUES
(1, '49767451', 'MONICA MARIA SANTIAGO', 'Medicina General', '2026-06-02', '21:56:00', 'Programada', '2026-05-31 21:02:50'),
(2, '49767451', 'MONICA MARIA SANTIAGO', 'Medicina General', '2026-06-05', '07:07:00', 'Cancelada', '2026-05-31 21:03:29'),
(3, '49767451', 'MONICA MARIA SANTIAGO', 'Pediatría', '2026-06-11', '10:10:00', 'Programada', '2026-05-31 21:09:21'),
(4, '49767451', 'MONICA MARIA SANTIAGO', 'Medicina General', '2026-06-06', '09:16:00', 'Programada', '2026-05-31 21:13:07'),
(5, '49767451', 'MONICA MARIA SANTIAGO', 'Cardiología', '2026-06-05', '08:16:00', 'Programada', '2026-05-31 21:13:55'),
(6, '49767451', 'MONICA MARIA SANTIAGO', 'Medicina del dolor', '2026-06-08', '15:10:00', 'Programada', '2026-06-07 15:07:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(200) NOT NULL,
  `numero_identificacion` varchar(200) NOT NULL,
  `tipo_documento` varchar(200) NOT NULL,
  `Descripción_archivo` varchar(200) NOT NULL,
  `fecha_solicitud` datetime(6) NOT NULL,
  `estado` enum('registrado','gestionado','confirmado','cancelado') NOT NULL,
  `id_usuario` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `numero_identificacion`, `tipo_documento`, `Descripción_archivo`, `fecha_solicitud`, `estado`, `id_usuario`) VALUES
(1, '', '', 'solicitar\r\nconsultar\r\ngenerar\r\nenviar', '2026-01-01 00:00:00.000000', 'registrado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `contrato` varchar(200) NOT NULL,
  `id_medico` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `nombre`, `contrato`, `id_medico`) VALUES
(1, '', 'asignar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(200) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `rethus` varchar(200) NOT NULL,
  `id_cita` int(200) NOT NULL,
  `disponibilidad` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `nombres`, `apellidos`, `rethus`, `id_cita`, `disponibilidad`) VALUES
(1, '', '', '', 3, 'con agenda\r\nsin agenda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol`
--

CREATE TABLE `Rol` (
  `id` int(200) NOT NULL,
  `Rol` varchar(200) NOT NULL,
  `Tipo_rol` enum('Administrador','usuario','Medico') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Rol`
--

INSERT INTO `Rol` (`id`, `Rol`, `Tipo_rol`) VALUES
(1, 'Consultar', NULL),
(2, '', NULL),
(3, 'Consultar', NULL),
(4, '', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(200) NOT NULL,
  `numero_identificacion` varchar(200) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `Nombres` varchar(200) NOT NULL,
  `Apellidos` varchar(200) NOT NULL,
  `Id_rol` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `numero_identificacion`, `correo_electronico`, `Nombres`, `Apellidos`, `Id_rol`) VALUES
(1, '', '', 'registrarse\r\niniciar sesión\r\nconsultar datos\r\ngenerar reportes\r\nmodificar\r\ndeshabilitar', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cedula` varchar(20) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `cedula`, `correo`, `password`, `rol`, `fecha_registro`) VALUES
(2, 'MONICA MARIA SANTIAGO', '49767451', 'hillarycharlotte58@gmail.com', '$2y$10$yDDSFK7OS.Vaf9yGYyioruyIbzw6J21UmV5vDC2VeZ4vC6PBYWSwK', 'usuario', '2026-05-31 20:36:20');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `citas_nueva`
--
ALTER TABLE `citas_nueva`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `especialidad_ibfk_1` (`id_medico`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicos_ibfk_1` (`id_cita`);

--
-- Indices de la tabla `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `Id_rol` (`Id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `citas_nueva`
--
ALTER TABLE `citas_nueva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Rol`
--
ALTER TABLE `Rol`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD CONSTRAINT `especialidad_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Id_rol`) REFERENCES `Rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 18-02-2026 a las 00:48:21
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria_patitas_felices`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `duenios`
--

CREATE TABLE `duenios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `duenios`
--

INSERT INTO `duenios` (`id`, `nombre`, `apellido`, `telefono`, `direccion`) VALUES
(1, 'María', 'González', '11-1234-5678', 'Av. Siempre Viva 123'),
(2, 'Carlos', 'Rodríguez', '11-8765-4321', 'Calle Falsa 456'),
(3, 'Ana', 'Martínez', '11-5555-9999', 'Angel Mallea 2906'),
(4, 'Jose Carlos', 'Silvestre', '11-9999-8888', 'Calle 123'),
(5, 'Lucas', 'Silvestre', '11-2222-3333', 'Calle Falsa 123'),
(6, 'Maria Elena', 'Sergnese', '1168792215', 'Cortaderas 234'),
(7, 'Gustavo', 'Silvestre', '1158479601', 'Lanus Jodete');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

CREATE TABLE `historial_clinico` (
  `id` int(11) NOT NULL,
  `id_mascota` int(11) NOT NULL,
  `id_veterinario` int(11) NOT NULL,
  `tipo_consulta` varchar(50) NOT NULL DEFAULT 'Chequeo General',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(250) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `id_mascota`, `id_veterinario`, `tipo_consulta`, `fecha_registro`, `descripcion`, `usuario_id`) VALUES
(2, 2, 2, 'Chequeo General', '2025-12-19 02:23:49', 'Consulta por caída de pelo - tratamiento indicado', 13),
(3, 1, 3, 'Chequeo General', '2026-02-04 20:34:58', 'Primera consulta del nuevo veterinario Dermatologo', 14),
(5, 2, 1, 'Chequeo General', '2026-02-04 20:52:28', 'Problemas renales. Se le inyectó una ampolla de flexicamin 3mg.', 12),
(6, 4, 4, 'Vacunación', '2026-02-15 13:43:32', 'Se le dio atención primaria al paciente porque presentaba tos de fumador.', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_duenio` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `fecha_nacimiento`, `id_duenio`, `usuario_id`) VALUES
(1, 'Antonia', 'Perro', '2020-05-15', 1, NULL),
(2, 'Estrella', 'Gato', '2021-08-22', 2, NULL),
(3, 'Toto', 'Reptil', '1879-02-24', 6, NULL),
(4, 'Pericardo', 'Ave', '1945-08-02', 7, 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `id_mascota` int(11) NOT NULL,
  `id_veterinario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `estado` enum('Pendiente','Realizado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id`, `id_mascota`, `id_veterinario`, `fecha`, `hora`, `motivo`, `estado`, `created_at`) VALUES
(1, 1, 1, '2026-02-16', '09:00:00', 'Cirugía programada', 'Pendiente', '2026-02-16 14:42:45'),
(2, 2, 2, '2026-02-16', '10:30:00', 'Vacunación Anual', 'Pendiente', '2026-02-16 14:42:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `rol` enum('admin','veterinario') NOT NULL DEFAULT 'veterinario',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password_hash`, `nombre`, `apellido`, `rol`, `created_at`, `updated_at`) VALUES
(11, 'admin_lgs@patitasfelices.com', '$2b$10$qR2Fn9lZQmKPZLkrno52EOrFDko6rq2YgQFz4gyGsYegmlSx1jYy2', 'Administrador', 'Sistema', 'admin', '2026-02-03 20:30:54', '2026-02-03 20:30:54'),
(12, 'jose.perez@patitasfelices.com', '$2b$10$ZzwXurAURV1hytksi51I3efsN/.gy7WkQv5ehvwIACoq2R5aWdqcK', 'Jose', 'Perez', 'veterinario', '2026-02-03 20:34:30', '2026-02-03 20:34:30'),
(13, 'beni.pepe@patitasfelices.com', '$2b$10$flDOQ2T81DHFdr6oBvX.R.n3wjFuRkzgfcoril//VQ3mAjm2vkyv.', 'Benicio', 'Pepe', 'veterinario', '2026-02-03 20:38:15', '2026-02-03 20:38:15'),
(14, 'nuevo.veterinario@patitas.com', '$2b$10$E9/DZsw/mgeIYvVFxX0AaOy.Qz466fBwfVurbll3n/ZE.DoMhZ9JS', 'Nuevo', 'Veterinario', 'veterinario', '2026-02-04 20:29:59', '2026-02-04 20:29:59'),
(15, 'benisilvestre@patitasfelices.com.ar', '$2b$10$X6pRrlmrRyeMc2gDrQ9.cOCVs0p.RmDxayjv4jxbcKZojoqpguLb6', 'Benicio', 'Silvestre', 'veterinario', '2026-02-10 23:23:10', '2026-02-10 23:23:10'),
(16, 'giu.silvestre@patitasfelices.com.ar', '$2b$10$tqWJGsskBUlakUaYIf8IOOkJI.roLPDQfryxNYDYKozJI8XlVSzmO', 'Giuliana', 'Silvestre', 'veterinario', '2026-02-12 23:20:56', '2026-02-12 23:20:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

CREATE TABLE `veterinarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `veterinarios`
--

INSERT INTO `veterinarios` (`id`, `nombre`, `apellido`, `matricula`, `especialidad`, `usuario_id`) VALUES
(1, 'Dr. Juan', 'Pérez', 'VET-12345', 'Cirugía', 12),
(2, 'Dra. Laura', 'Sánchez', 'VET-67890', 'Traumatología', 13),
(3, 'Nuevo', 'Veterinario', 'VET-99999', 'Dermatología', 14),
(4, 'Giuliana', 'Silvestre', 'VET-2367', 'Fisioterapia', 16);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `duenios`
--
ALTER TABLE `duenios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota` (`id_mascota`),
  ADD KEY `id_veterinario` (`id_veterinario`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_duenio` (`id_duenio`),
  ADD KEY `fk_mascota_usuario` (`usuario_id`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `turnos_ibfk_1` (`id_mascota`),
  ADD KEY `turnos_ibfk_2` (`id_veterinario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `duenios`
--
ALTER TABLE `duenios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD CONSTRAINT `historial_clinico_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_clinico_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `fk_mascota_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_duenio`) REFERENCES `duenios` (`id`);

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`);

--
-- Filtros para la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD CONSTRAINT `veterinarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

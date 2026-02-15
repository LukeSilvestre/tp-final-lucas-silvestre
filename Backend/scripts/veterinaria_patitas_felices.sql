-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 04-02-2026 a las 23:59:07
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
(4, 'Jose Carlos', 'Silvestre', '11-9999-8888', 'Calle 123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

CREATE TABLE `historial_clinico` (
  `id` int(11) NOT NULL,
  `id_mascota` int(11) NOT NULL,
  `id_veterinario` int(11) NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` varchar(250) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `id_mascota`, `id_veterinario`, `fecha_registro`, `descripcion`, `usuario_id`) VALUES
(2, 2, 2, '2025-12-19 02:23:49', 'Consulta por caída de pelo - tratamiento indicado', 13),
(3, 1, 3, '2026-02-04 20:34:58', 'Primera consulta del nuevo veterinario Dermatologo', 14),
(5, 2, 1, '2026-02-04 20:52:28', 'Problemas renales', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `especie` varchar(30) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_duenio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `especie`, `fecha_nacimiento`, `id_duenio`) VALUES
(1, 'Antonia', 'Perro', '2020-05-15', 1),
(2, 'Estrella', 'Gato', '2021-08-22', 2);

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
(14, 'nuevo.veterinario@patitas.com', '$2b$10$E9/DZsw/mgeIYvVFxX0AaOy.Qz466fBwfVurbll3n/ZE.DoMhZ9JS', 'Nuevo', 'Veterinario', 'veterinario', '2026-02-04 20:29:59', '2026-02-04 20:29:59');

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
(3, 'Nuevo', 'Veterinario', 'VET-99999', 'Dermatología', 14);

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
  ADD KEY `id_duenio` (`id_duenio`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_duenio`) REFERENCES `duenios` (`id`);

--
-- Filtros para la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD CONSTRAINT `veterinarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

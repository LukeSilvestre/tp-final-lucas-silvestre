--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE IF NOT EXISTS `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_mascota` int(11) NOT NULL,
  `id_veterinario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `estado` enum('Pendiente', 'Realizado', 'Cancelado') NOT NULL DEFAULT 'Pendiente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_mascota` (`id_mascota`),
  KEY `id_veterinario` (`id_veterinario`),
  CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Datos de prueba para la tabla `turnos`
--

INSERT INTO `turnos` (`id_mascota`, `id_veterinario`, `fecha`, `hora`, `motivo`, `estado`) VALUES
(1, 1, CURDATE(), '09:00:00', 'Cirugía programada', 'Pendiente'),
(2, 2, CURDATE(), '10:30:00', 'Vacunación Anual', 'Pendiente'),
(3, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '11:00:00', 'Control de rutina', 'Pendiente');

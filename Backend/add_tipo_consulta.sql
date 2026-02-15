-- Archivo: add_tipo_consulta.sql
-- Objetivo: Añadir el campo tipo_consulta a la tabla de historiales clínicos

USE veterinaria_db; -- Asegúrate de que el nombre sea el correcto

ALTER TABLE historial_clinico 
ADD COLUMN tipo_consulta VARCHAR(50) NOT NULL DEFAULT 'Chequeo General' 
AFTER id_veterinario;

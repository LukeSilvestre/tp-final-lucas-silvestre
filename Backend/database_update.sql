-- Agregar columna usuario_id a la tabla mascotas para seguimiento de propiedad
ALTER TABLE mascotas ADD COLUMN usuario_id INT;

-- Establecer la relación (FK) con la tabla usuarios
ALTER TABLE mascotas ADD CONSTRAINT fk_mascota_usuario 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
ON DELETE SET NULL;

-- Nota: Si ya existen mascotas, el usuario_id será NULL. 
-- Deberías asignarles un dueño (usuario) manualmente si es necesario.

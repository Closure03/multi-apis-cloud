 -- 1) Crear un esquema específico para Users
 CREATE SCHEMA IF NOT EXISTS users_schema AUTHORIZATION sgsadmin;
 -- 2) Crear la tabla dentro del esquema
 CREATE TABLE IF NOT EXISTS users_schema.users (
 id SERIAL PRIMARY KEY,
 name  TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL
 );
 -- 3) (Opcional) Dar privilegios al usuario administrador
 GRANT ALL PRIVILEGES ON SCHEMA users_schema TO sgsadmin;
 GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA users_schema TO sgsadmin;


-- 1) Crear un esquema específico para Products
CREATE SCHEMA IF NOT EXISTS products_schema AUTHORIZATION sgsadmin;

-- 2) Crear la tabla dentro del esquema
CREATE TABLE IF NOT EXISTS products_schema.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT
);

-- 3) (Opcional) Dar privilegios al usuario administrador
GRANT ALL PRIVILEGES ON SCHEMA products_schema TO sgsadmin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA products_schema TO sgsadmin;
---------------------------------------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS products_schema AUTHORIZATION sgsadmin;

CREATE TABLE IF NOT EXISTS products_schema.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT
);

GRANT ALL PRIVILEGES ON SCHEMA products_schema TO sgsadmin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA products_schema TO sgsadmin;

-- Inserción simple (serial asigna el id)
INSERT INTO products_schema.products (name, price, description)
VALUES 
  ('Laptop Pro 14', 1299.99, 'Portátil profesional 14"'),
  ('Mouse Inalámbrico', 24.50, 'Mouse ergonómico inalámbrico'),
  ('Teclado Mecánico', 89.99, 'Teclado retroiluminado con switches azules')
RETURNING id, name, price, description;

-- Inserción con id explícito (si deseas controlar el id)
INSERT INTO products_schema.products (id, name, price, description)
VALUES (101, 'Laptop Pro 14', 1299.99, 'Portátil profesional 14"')
RETURNING id, name;

select * from products_schema.products;
-- ...existing code...

-- Inserciones de ejemplo para users_schema.users
INSERT INTO users_schema.users (name, email)
VALUES
  ('Juan Pérez', 'juan.perez@example.com'),
  ('Ana Gómez', 'ana.gomez@example.com'),
  ('Carlos Ruiz', 'carlos.ruiz@example.com')
RETURNING id, name, email;

-- Consulta para verificar contenido
SELECT id, name, email
FROM users_schema.users
ORDER BY id;

-- ...existing code...
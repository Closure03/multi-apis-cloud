CREATE SCHEMA IF NOT EXISTS products_schema AUTHORIZATION sgsadmin;

-- 2) Crear la tabla dentro del esquema
CREATE TABLE IF NOT EXISTS products_schema.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);

-- 3) (Opcional) Dar privilegios al usuario administrador
GRANT ALL PRIVILEGES ON SCHEMA products_schema TO sgsadmin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA products_schema TO sgsadmin;



-- 4) (Opcional) Dar privilegios de solo lectura a un usuario específico
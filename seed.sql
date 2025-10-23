-- Insert users with bcrypt password
INSERT INTO users (email, password, role) VALUES
('admin@sportsline.com', '$2b$10$hFprRkqNRlT8zq5rS6pB6ehB7Tspn8xUJ4wpuD6NRKyU6zR5sMDCW', 'admin'),       -- admin123
('vendedor1@sportsline.com', '$2b$10$W8AgGdBuq5gS4o0YrFDv1O2zAqSe0bSoJ8wIMZ6nIgWsa/f2zZywa', 'vendedor'), -- vendedor123
('vendedor2@sportsline.com', '$2b$10$E.T9cAzyOITk0p9R4b4Z6OZsLpLdZ8YCO4vS3Ew0fB2oQEY3Hyo0G', 'vendedor'); -- vendedor123

-- Insert clients
INSERT INTO clients (name, email, phone) VALUES
('Juan Pérez', 'juanperez@gmail.com', '3001234567'),
('María Gómez', 'mariagomez@hotmail.com', '3019876543'),
('Carlos López', 'carloslopez@yahoo.com', '3025558899');

-- Insert products
INSERT INTO products (code, name, description, price, stock) VALUES
('NK001', 'Nike Air Max', 'Zapatillas deportivas Air Max 2024', 499000, 25),
('NK002', 'Nike Revolution 6', 'Zapatillas de running ligeras', 329000, 40),
('NK003', 'Nike Dri-Fit Shirt', 'Camiseta deportiva transpirable', 159000, 60),
('NK004', 'Nike Hoodie Essential', 'Buzo con capucha para entrenamiento', 249000, 30);

-- Insert orders
INSERT INTO orders (client_id, user_id, total_amount, status) VALUES
(1, 2, 828000, 'completed'),
(2, 2, 658000, 'pending'),
(3, 3, 249000, 'completed');

-- Insert order details order_products
INSERT INTO order_products (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 499000), -- Juan bought 1 Air Max
(1, 3, 2, 159000), -- Juan bought 2 shirts
(2, 2, 2, 329000), -- María bought 2 Revolution 6
(3, 4, 1, 249000); -- Carlos bought 1 Hoodie

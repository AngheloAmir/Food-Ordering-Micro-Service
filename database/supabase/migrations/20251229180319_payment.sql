CREATE TYPE payment_status AS ENUM ('pending', 'tobeRecieved', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cod', 'online');

CREATE TABLE payment (
    payment_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES auth.users(id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- the products must be an array of objects
    -- and it save the product_id, quantity, price, name, image, description
    products JSONB DEFAULT '[]',

    -- the reference of the checkout
    -- when this payment is has been successfull
    checkout_id    UUID REFERENCES checkout(checkout_id),

    -- Billing Information
    total_amount       DECIMAL(10,2),
    discount           DECIMAL(10,2),
    tax                DECIMAL(10,2),
    delivery_fee       DECIMAL(10,2),
    other_charges      DECIMAL(10,2),
    total              DECIMAL(10,2),

    -- Payment Information
    payment_method     payment_method DEFAULT 'cod',
    payment_status     payment_status DEFAULT 'pending',
    payment_id         VARCHAR(50),
    payment_date       TIMESTAMPTZ,
    payment_amount     DECIMAL(10,2),

    -- Card information if Card
    card_number        VARCHAR(16)  DEFAULT NULL,
    card_expiry        VARCHAR(5)   DEFAULT NULL,
    card_cvv           VARCHAR(3)   DEFAULT NULL,
    card_holder_name   VARCHAR(100) DEFAULT NULL,
);
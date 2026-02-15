-- Optimization: Add indexes for common queries
CREATE INDEX IF NOT EXISTS tickets_user_id_idx ON tickets(user_id);
CREATE INDEX IF NOT EXISTS tickets_qr_code_idx ON tickets(qr_code);
CREATE INDEX IF NOT EXISTS tickets_event_date_idx ON tickets(event_date);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_stripe_session_id_idx ON orders(stripe_session_id);

-- Optimization: Add constraints for data integrity
ALTER TABLE tickets 
ADD CONSTRAINT tickets_status_check 
CHECK (status IN ('valid', 'used', 'refunded', 'transferred', 'listed'));

ALTER TABLE orders
ADD CONSTRAINT orders_status_check
CHECK (status IN ('pending', 'completed', 'failed', 'refunded'));

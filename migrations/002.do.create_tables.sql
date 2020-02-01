CREATE TABLE tables (
  id SERIAL PRIMARY KEY,
  data TEXT NOT NULL,
  table_name TEXT NOT NULL,
  table_type TEXT
);

ALTER TABLE tables
    ADD user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
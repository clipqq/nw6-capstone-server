CREATE TABLE fuudi_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE fuudi_menu
  ADD COLUMN
    user_id INTEGER REFERENCES fuudi_users(id)
    ON DELETE SET NULL;

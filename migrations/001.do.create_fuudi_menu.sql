CREATE TABLE fuudi_menu (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  locations_served TEXT NOT NULL,
  payment_type TEXT NOT NULL,
  diet_type TEXT,
  cuisine_type TEXT,
  description TEXT,
  pickup_instructions TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);

ALTER TABLE fuudi_menu
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS fuudi_users;

CREATE TABLE fuudi_reviews (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    menu_item_id INTEGER
        REFERENCES fuudi_menu(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES fuudi_users(id) ON DELETE CASCADE NOT NULL
);

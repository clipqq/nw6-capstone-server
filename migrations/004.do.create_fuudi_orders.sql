CREATE TABLE fuudi_orders (
    user_id INTEGER REFERENCES fuudi_users (id) ON DELETE CASCADE NOT NULL,
    menu_item_id INTEGER REFERENCES fuudi_menu (id) ON DELETE CASCADE NOT NULL,
    added_date TIMESTAMP DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, menu_item_id)
);


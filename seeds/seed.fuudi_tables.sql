BEGIN;

TRUNCATE
  fuudi_menu,
  fuudi_users,
  fuudi_reviews,
  fuudi_orders
  RESTART IDENTITY CASCADE;

-- INSERT INTO blogful_users (user_name, full_name, nickname, password)
-- VALUES
--   ('dunder', 'Dunder Mifflin', null, 'password'),
--   ('b.deboop', 'Bodeep Deboop', 'Bo', 'bo-password'),
--   ('c.bloggs', 'Charlie Bloggs', 'Charlie', 'charlie-password'),
--   ('s.smith', 'Sam Smith', 'Sam', 'sam-password'),
--   ('lexlor', 'Alex Taylor', 'Lex', 'lex-password'),
--   ('wippy', 'Ping Won In', 'Ping', 'ping-password');

-- bcrypt.hash('test-string', 1).then(hash => console.log({ hash }))

-- const pws = ['bo-password','charlie-password','sam-password','lex-password','ping-password']

INSERT INTO fuudi_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$06$Rf8tk2zpgu838fG.i.L8.e1jAZaotbcMD1dMdAYD8lp3.lDGbMRcm'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$05$2fapJ/wLx5Zq5xGcDo6XvOtcWIT2lCRpvObQ0rABm.aja8CjwAHbu'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$05$JqDRpIDOKM3bEQawXCVttetuRiLSnw98RWl/Obxc48UMIm.MWeCfi'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$05$Epoz3dQc7j.dmuTsBsGsq./sjXYK.CiRFPSJ/rh5vySVuaZawykRy'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$05$J.cTxgvbaWJH4qBGavWXJOZzh3e3gI8/otCVGlbC3.5aftQBhJ0pC'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$05$u4.0ZEu6B4PIQNaFwyeKEOcjah2SdOftxBbYT.YgYBmG5AoyPIaVq');

-- INSERT INTO fuudi_menu (title, image, user_id, locations_served,
--   payment_type, description)
-- VALUES
--   ('Authentic Chinese Noodle Soup!', 'https://loremflickr.com/750/300/landscape?random=1', 1, 'San Francisco', 'Cash', 'Hand-made beef noodle soup.'),
--   ('Austrian Wienerschnitzel', 'https://loremflickr.com/750/300/landscape?random=2', 2, 'Marin', 'Cash', 'Once you have it - you''ll be back. Now get in the choppa and order.'),
--   ('Indian Tandoori Chicken', 'https://loremflickr.com/750/300/landscape?random=3', 3, 'Fremont', 'Cash/Credit', 'Straight from my mom''s kitchen. Free naan with every order.'),
--   ('PIZZA!!', 'https://loremflickr.com/750/300/landscape?random=4', 1, 'Oakland', 'Cash', 'Classic deep dish.'),
--   ('Hong Kong Egg Tart', 'https://loremflickr.com/750/300/landscape?random=5', 2, 'Daly City', 'Cash', 'Best egg tart OK.'),
--   ('Enchiladas', 'https://loremflickr.com/750/300/landscape?random=6', 3, 'Hayward', 'Cash/Credit', 'Hola! Te gusta enchiladas?'),
--   ('Enchiladas', 'https://loremflickr.com/750/300/landscape?random=7', 4, 'Hayward', 'Cash/Credit', 'Hola! Te gusta enchiladas?'),
--   ('Half Eatn Breakfast', 'https://loremflickr.com/750/300/landscape?random=8', 5, 'LA', 'Cash/Credit', 'It''s still good. Sorta.'),
--   ('Vegan Meatballs', 'https://loremflickr.com/750/300/landscape?random=9', 6, 'San Jose', 'Cash/Credit', 'Homemade and guaranteed meat free.'),
--   ('Polish Style Goulash', 'https://loremflickr.com/750/300/landscape?random=10', 1, 'San Diego', 'Cash', '100 year old family recipe delivered right to your door.'),
--   ('Hand-Painted Rubber Ducky', 'https://loremflickr.com/750/300/landscape?random=11', 1, 'San Francisco', 'Cash', 'This ducky has been hand-painted and is now art. Therefore it is useless and cannot be put in water.'),
--   ('Cloning Machine', 'https://loremflickr.com/750/300/landscape?random=12', 2, 'Oakland', 'Credit', '100% guaranteed to occasionally work every time! Requires a 167.23v power outlet or a dragonscale battery (obtained separately by solving a riddle).');

INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.corriecooks.com/wp-content/uploads/2018/08/Instant-Pot-Beef-Noodle-Soup-500x500.jpg', 'Authentic Chinese Noodle Soup!', 'San Francisco', 'Cash', NULL, NULL, 'Hand-made beef noodle soup.', NULL, '2019-12-02 18:36:02.707', 1);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.recipetineats.com/wp-content/uploads/2017/08/Schnitzel-9-500x500.jpg', 'Austrian Wienerschnitzel', 'Marin', 'Cash', NULL, NULL, 'Once you have it - you''ll be back. Now get in the choppa and order.', NULL, '2019-12-02 18:36:02.707', 2);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://twosleevers.com/wp-content/uploads/2017/12/Tandoori-Chicken-Wide-500x500.jpg', 'Indian Tandoori Chicken', 'Fremont', 'Cash/Credit', NULL, NULL, 'Straight from my mom''s kitchen. Free naan with every order.', NULL, '2019-12-02 18:36:02.707', 3);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('http://taneresidence.com/wp-content/uploads/2018/07/best-egg-tarts-hong-kong-500x500.jpg', 'Hong Kong Egg Tart', 'Daly City', 'Cash', NULL, NULL, 'Best egg tart OK.', NULL, '2019-12-02 18:36:02.707', 2);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_7869_8355.jpg', 'Enchiladas', 'Hayward', 'Cash/Credit', NULL, NULL, 'Hola! Te gusta enchiladas?', NULL, '2019-12-02 18:36:02.707', 3);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://cdnimg.webstaurantstore.com/uploads/blog/2019/7/blog-knockwurst_in-blog2.jpg', 'Handmade German Sausages', 'Hayward', 'Cash/Credit', NULL, NULL, 'Best sausage, fresh from my farm. Saurkraut available.', NULL, '2019-12-02 18:36:02.707', 4);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://amandascookin.com/wp-content/uploads/2019/04/eggs-benedict-recipe-680-500x500.jpg', 'Eggs Benedict + More!', 'Berkeley', 'Cash/Credit', NULL, NULL, 'Homecooked brunch anytime of the day.', NULL, '2019-12-02 18:36:02.707', 5);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://makeitdairyfree.com/wp-content/uploads/2019/03/vegan-italian-meatballs-4-500x500.jpg', 'Delicious Vegan Meatballs', 'San Jose', 'Cash/Credit', NULL, NULL, 'Homemade and guaranteed meat free.', NULL, '2019-12-02 18:36:02.707', 6);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://recipesfromapantry.com/wp-content/uploads/2018/07/Instant-Pot-Goulash-hungarian-4-500x500.jpg', 'Hungarian Style Goulash', 'San Francisco', 'Cash', NULL, NULL, '100 year old family recipe. We can do vegetarian also.', NULL, '2019-12-02 18:36:02.707', 1);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.justonecookbook.com/wp-content/uploads/2019/05/Miso-Ramen-I-500x500.jpg', 'Handmade Ramen Noodle Soup', 'San Francisco', 'Cash', NULL, NULL, 'Made at home by a former chef with 15 years experience.', NULL, '2019-12-02 18:36:02.707', 1);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.mygorgeousrecipes.com/wp-content/uploads/2019/02/Moroccan-Couscous-Salad-with-Chickpeas-9f-1.png', 'Morrocan Coucous Salad w/ Chickpeas', 'Oakland', 'Cash/Credit', NULL, NULL, '100% Vegetarian, made with fresh ingredients every Sunday.', NULL, '2019-12-02 18:36:02.707', 2);
INSERT INTO fuudi_menu (image, title, locations_served, payment_type, diet_type, cuisine_type, description, pickup_instructions, date_created, user_id) VALUES('https://www.dinneratthezoo.com/wp-content/uploads/2015/09/chicken-alfredo-pizza-5-500x500.jpg', 'UNCOMMON PIZZA!!', 'Oakland', 'Cash', NULL, NULL, 'Classic deep dish.', NULL, '2019-12-02 18:36:02.707', 1);


INSERT INTO fuudi_reviews (
  text,
  rating,
  menu_item_id,
  user_id
) VALUES
  (
    'This thing is amazing.',
    4,
    1,
    2
  ),
  (
    'Put a bird on it!',
    4,
    1,
    3
  ),
  (
    'All the other reviewers are obviously insane, but this thing is actually pretty amazing.',
    5,
    6,
    4
  ),
  (
    'When life gives you lemons, trade them for this thing.',
    4,
    4,
    5
  ),
  (
    'This cured my psoriasis, but left me unable to tell the difference between the taste of squash and the concept of increasing.',
    3,
    9,
    6
  ),
  (
    'I think I swallowed a bug.',
    1,
    4,
    1
  ),
  (
    'I have not used it or even seen it, and I do not actually know what it is. I do not know why I am writing this review, how I got here, or what my name is. Three stars!',
    3,
    2,
    3
  ),
  (
    'Ew.',
    1,
    2,
    6
  ),
  (
    'I heard about this one time at band camp.',
    3,
    10,
    4
  ),
  (
    'big time many goodness!!!',
    5,
    2,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!',
    2,
    1,
    5
  ),
  (
    'There are some better things. There are also some worse things.',
    3,
    1,
    1
  ),
  (
    'Great holiday present for extraterrestrials (only the kind with the lightbulb heads).',
    4,
    12,
    2
  ),
  (
    'It does not say this on the label, but this thing can be used to summon rain on the spring equinox with the proper incantation.',
    3,
    2,
    3
  ),
  (
    'Do not believe the hype!',
    1,
    1,
    4
  ),
  (
    'I would rather have a shoulder rub.',
    3,
    1,
    6
  ),
  (
    'I heard this has lead in it! Run! RRUUUUUUNNNN!',
    1,
    2,
    5
  ),
  (
    'This would not fit inside the cabin of my horse-and-buggy, but it was a useful bribe after the string cheese incident.',
    4,
    7,
    1
  ),
  (
    'Slightly better than waking up deep in the forests of Madagascar and having no idea how you got there, but not THAT much better.',
    3,
    1,
    2
  ),
  (
    'Octopii give it eight tentacles up!',
    5,
    7,
    4
  );
  
  
INSERT INTO fuudi_orders (user_id, menu_item_id, added_date)
VALUES
('1', '1', CURRENT_TIMESTAMP),
('2', '2', CURRENT_TIMESTAMP),
('3', '3', CURRENT_TIMESTAMP),
('4', '4', CURRENT_TIMESTAMP),
('5', '5', CURRENT_TIMESTAMP),
('6', '6', CURRENT_TIMESTAMP),
('1', '7', CURRENT_TIMESTAMP),
('2', '8', CURRENT_TIMESTAMP),
('3', '9', CURRENT_TIMESTAMP),
('4', '10', CURRENT_TIMESTAMP),
('5', '11', CURRENT_TIMESTAMP),
('6', '12', CURRENT_TIMESTAMP),
('1', '12', CURRENT_TIMESTAMP),
('2', '11', CURRENT_TIMESTAMP),
('3', '10', CURRENT_TIMESTAMP),
('4', '9', CURRENT_TIMESTAMP),
('5', '8', CURRENT_TIMESTAMP),
('6', '7', CURRENT_TIMESTAMP),
('1', '6', CURRENT_TIMESTAMP),
('2', '5', CURRENT_TIMESTAMP),
('3', '4', CURRENT_TIMESTAMP),
('4', '3', CURRENT_TIMESTAMP),
('5', '2', CURRENT_TIMESTAMP),
('6', '1', CURRENT_TIMESTAMP);


COMMIT;

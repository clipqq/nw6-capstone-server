BEGIN;

TRUNCATE
  fuudi_menu,
  fuudi_users,
  fuudi_reviews
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

INSERT INTO fuudi_menu (title, image, user_id, locations_served,
  payment_type, description)
VALUES
  ('Hand-Painted Rubber Ducky', 'https://loremflickr.com/750/300/landscape?random=1', 1, 'San Francisco', 'Cash', 'This ducky has been hand-painted and is now art. Therefore it is useless and cannot be put in water.'),
  ('Cloning Machine', 'https://loremflickr.com/750/300/landscape?random=2', 2, 'Oakland', 'Credit', '100% guaranteed to occasionally work every time! Requires a 167.23v power outlet or a dragonscale battery (obtained separately by solving a riddle).');

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
    1,
    4
  ),
  (
    'When life gives you lemons, trade them for this thing.',
    4,
    1,
    5
  ),
  (
    'This cured my psoriasis, but left me unable to tell the difference between the taste of squash and the concept of increasing.',
    3,
    2,
    6
  ),
  (
    'I think I swallowed a bug.',
    1,
    2,
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
    2,
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
    2,
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
    2,
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
    2,
    4
  );

COMMIT;

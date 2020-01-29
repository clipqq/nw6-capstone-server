const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      password: "password",
      user_email: "demoUser@gmail.com"
    },
    {
        id: 2,
        user_name: "test-user-2",
        password: "password",
        user_email: "demoUser2@gmail.com"
      },
      {
        id: 3,
        user_name: "test-user-3",
        password: "password",
        user_email: "demoUser3@gmail.com"
      },
      {
        id: 4,
        user_name: "test-user-4",
        password: "password",
        user_email: "demoUser4@gmail.com"
      }
  ];
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into("users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('users_id_seq', ?)`, [
        users[users.length - 1].id
      ])
    );
}

function makeTablesArray(users) {
  return [
    {
      id: 1,
      data: `[ 
        {"name":"Ruby","year":"2012","quarter":"2","count":"18117"},
      {"name":"Python","year":"2012","quarter":"2","count":"16557"},
      {"name":"JavaScript","year":"2012","quarter":"2","count":"16411"},
      {"name":"PHP","year":"2012","quarter":"2","count":"14460"},
      {"name":"Java","year":"2012","quarter":"2","count":"8006"},
      {"name":"C++","year":"2012","quarter":"2","count":"4879"},
      {"name":"C","year":"2012","quarter":"2","count":"4217"},
      {"name":"C#","year":"2012","quarter":"2","count":"1866"}]`,
      table_name: "First test thing!",
      user_id: users[0].id
    },
    {
        id: 2,
        data: `[ 
          {"name":"Ruby","year":"2012","quarter":"2","count":"18117"},
        {"name":"Python","year":"2012","quarter":"2","count":"16557"},
        {"name":"JavaScript","year":"2012","quarter":"2","count":"16411"},
        {"name":"PHP","year":"2012","quarter":"2","count":"14460"},
        {"name":"Java","year":"2012","quarter":"2","count":"8006"},
        {"name":"C++","year":"2012","quarter":"2","count":"4879"},
        {"name":"C","year":"2012","quarter":"2","count":"4217"},
        {"name":"C#","year":"2012","quarter":"2","count":"1866"}]`,
        table_name: "First test thing!",
        user_id: users[1].id
      },
      {
        id: 3,
        data: `[ 
          {"name":"Ruby","year":"2012","quarter":"2","count":"18117"},
        {"name":"Python","year":"2012","quarter":"2","count":"16557"},
        {"name":"JavaScript","year":"2012","quarter":"2","count":"16411"},
        {"name":"PHP","year":"2012","quarter":"2","count":"14460"},
        {"name":"Java","year":"2012","quarter":"2","count":"8006"},
        {"name":"C++","year":"2012","quarter":"2","count":"4879"},
        {"name":"C","year":"2012","quarter":"2","count":"4217"},
        {"name":"C#","year":"2012","quarter":"2","count":"1866"}]`,
        table_name: "First test thing!",
        user_id: users[2].id
      },
      {
        id: 4,
        data: `[ 
          {"name":"Ruby","year":"2012","quarter":"2","count":"18117"},
        {"name":"Python","year":"2012","quarter":"2","count":"16557"},
        {"name":"JavaScript","year":"2012","quarter":"2","count":"16411"},
        {"name":"PHP","year":"2012","quarter":"2","count":"14460"},
        {"name":"Java","year":"2012","quarter":"2","count":"8006"},
        {"name":"C++","year":"2012","quarter":"2","count":"4879"},
        {"name":"C","year":"2012","quarter":"2","count":"4217"},
        {"name":"C#","year":"2012","quarter":"2","count":"1866"}]`,
        table_name: "First test thing!",
        user_id: users[3].id
      }
  ];
}


function makeExpectedThing(users, thing, reviews = []) {
  const user = users.find(user => user.id === thing.user_id);

  const thingReviews = reviews.filter(review => review.thing_id === thing.id);

  const number_of_reviews = thingReviews.length;
  const average_review_rating = calculateAverageReviewRating(thingReviews);

  return {
    id: thing.id,
    image: thing.image,
    title: thing.title,
    content: thing.content,
    date_created: thing.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created
    }
  };
}6

function makeExpectedThingReviews(users, thingId, reviews) {
  const expectedReviews = reviews.filter(review => review.thing_id === thingId);

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id);
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created
      }
    };
  });
}

function makeMaliciousThing(user) {
  const maliciousThing = {
    id: 911,
    image: "http://placehold.it/500x500",
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
  };
  const expectedThing = {
    ...makeExpectedThing([user], maliciousThing),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };
  return {
    maliciousThing,
    expectedThing
  };
}

function makeTablesFixtures() {
  const testUsers = makeUsersArray();
  const testTables = makeTablesArray(testUsers);
  return { testUsers, testTables };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        tables,
        users
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE tables_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('tables_id_seq', 0)`),
        trx.raw(`SELECT setval('users_id_seq', 0)`),
      ])
    )
  )
}

function seedThingsTables(db, users, things, reviews = []) {
  return db
    .into("thingful_users")
    .insert(users)
    .then(() => db.into("thingful_things").insert(things))
    .then(() => reviews.length && db.into("thingful_reviews").insert(reviews));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

function seedMaliciousThing(db, user, thing) {
  return seedUsers(db, [user])
    .then(() => db.into("thingful_things").insert([thing]));
}

module.exports = {
  makeUsersArray,
  makeTablesArray,
  makeExpectedThing,
  makeExpectedThingReviews,
  makeMaliciousThing,
  makeAuthHeader,
  makeTablesFixtures,
  cleanTables,
  seedThingsTables,
  seedMaliciousThing,
  seedUsers
};
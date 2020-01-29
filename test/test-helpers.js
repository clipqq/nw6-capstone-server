const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
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
      table_name: "Second test thing!",
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
      table_name: "Third test thing!",
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
      table_name: "Fourth test thing!",
      user_id: users[3].id
    }
  ];
}

function makeTablesFixtures() {
  const testUsers = makeUsersArray();
  const testTables = makeTablesArray(testUsers);
  return { testUsers, testTables };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
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
          trx.raw(`SELECT setval('users_id_seq', 0)`)
        ])
      )
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256"
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeTablesArray,
  makeAuthHeader,
  makeTablesFixtures,
  cleanTables,
  seedUsers
};

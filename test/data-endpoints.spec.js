const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");

describe("app", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get("/")
      .expect(200, "Hello, world!");
  });
  it('GET / responds with "401 unauthorized, not logged in"', () => {
    return supertest(app)
      .get("/")
      .expect(401, "401 unauthorized, not logged in");
  });
  it('GET / responds with "404 project not found"', () => {
    return supertest(app)
      .get("/78903")
      .expect(404, "404 project not found");
  });
});

const app = require('../src/app')
const knex = require('knex')

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
    fuudi_menu,
    fuudi_users,
    fuudi_reviews
    RESTART IDENTITY CASCADE;`
  )
}

describe('app', () => {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => cleanTables(db))

  afterEach('cleanup', () => cleanTables(db))


  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })

  context(`Given no menu`, () => {
    it(`responds with 200 and an empty list`, () => {
      return supertest(app)
        .get('/menu')
        .expect(200, [])
    })
  })



})
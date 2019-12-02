const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Reviews Endpoints', function () {
  let db

  const {
    testMenuItems,
    testUsers,
  } = helpers.makeMenuFixtures()


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /reviews`, () => {
    beforeEach('insert menu items', () =>
      helpers.seedMenuTables(
        db,
        testUsers,
        testMenuItems,
      )
    )

    it(`creates a review, responding with 201 and the new review`, function () {
      this.retries(3)
      const testMenuItem = testMenuItems[0]
      const testUser = testUsers[0]
      const newReview = {
        text: 'Test new review',
        menu_item_id: testMenuItem.id,
        user_id: testUser.id,
        rating: 2
      }
      return supertest(app)
        .post('/reviews')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newReview)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.text).to.eql(newReview.text)
          expect(res.body.menu_item_id).to.eql(newReview.menu_item_id)
          expect(res.body.user.id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/reviews/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', {
            timeZone: 'UTC'
          })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
          .from('fuudi_reviews')
          .select('*')
          .where({
            id: res.body.id
          })
          .first()
          .then(row => {
            expect(row.text).to.eql(newReview.text)
            expect(row.menu_item_id).to.eql(newReview.menu_item_id)
            expect(row.user_id).to.eql(newReview.user_id)
            const expectedDate = new Date().toLocaleString('en', {
              timeZone: 'UTC'
            })
            const actualDate = new Date(row.date_created).toLocaleString()
            expect(actualDate).to.eql(expectedDate)
          })
        )
    })

    const requiredFields = ['text', 'rating', 'menu_item_id']

    requiredFields.forEach(field => {
      const testMenuItem = testMenuItems[0]
      const testUser = testUsers[0]
      const newReview = {
        rating: 2,
        text: 'Test new review',
        menu_item_id: testMenuItem.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newReview[field]

        return supertest(app)
          .post('/reviews')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newReview)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})
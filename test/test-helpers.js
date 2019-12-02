const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({
        user_id: user.id
    }, secret, {
        subject: user.user_name,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

function makeUsersArray() {
    return [{
            id: 1,
            user_name: 'test-user-1',
            full_name: 'Test user 1',
            nickname: 'TU1',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            user_name: 'test-user-2',
            full_name: 'Test user 2',
            nickname: 'TU2',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            user_name: 'test-user-3',
            full_name: 'Test user 3',
            nickname: 'TU3',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 4,
            user_name: 'test-user-4',
            full_name: 'Test user 4',
            nickname: 'TU4',
            password: 'password',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ]
}

function makeMenuArray(users) {
    return [{
            id: 1,
            title: 'First test menuItem!',
            image: 'http://placehold.it/500x500',
            user_id: users[0].id,
            date_created: '2029-01-22T16:28:32.615Z',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            pickup_instructions: 'Curnside pickup',
            cuisine_type: 'Dutch',
            diet_type: 'Paleo',
            payment_type: 'Cash',
            locations_served: 'San Mateo',
        },
        {
            id: 2,
            title: 'Second test menuItem!',
            image: 'http://placehold.it/500x500',
            user_id: users[1].id,
            date_created: '2029-01-22T16:28:32.615Z',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            pickup_instructions: 'Delivery',
            cuisine_type: 'Italian',
            diet_type: 'Vegan',
            payment_type: 'Credit/Cash',
            locations_served: 'Oakland',
        },
        {
            id: 3,
            title: 'Third test menuItem!',
            image: 'http://placehold.it/500x500',
            user_id: users[2].id,
            date_created: '2029-01-22T16:28:32.615Z',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            pickup_instructions: 'Delivery',
            cuisine_type: 'Chinese',
            diet_type: 'Keto',
            payment_type: 'Cash',
            locations_served: 'San Francisco',
        },
        {
            id: 4,
            title: 'Fourth test menuItem!',
            image: 'http://placehold.it/500x500',
            user_id: users[3].id,
            date_created: '2029-01-22T16:28:32.615Z',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            pickup_instructions: 'Delivery/Pickup',
            cuisine_type: 'New American',
            diet_type: 'Vegetarian',
            payment_type: 'Credit',
            locations_served: 'San Jose',
        },
    ]
}

function makeReviewsArray(users, menuItem) {
    return [{
            id: 1,
            rating: 2,
            text: 'First test review!',
            menu_item_id: menuItem[0].id,
            user_id: users[0].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 2,
            rating: 3,
            text: 'Second test review!',
            menu_item_id: menuItem[0].id,
            user_id: users[1].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 3,
            rating: 1,
            text: 'Third test review!',
            menu_item_id: menuItem[0].id,
            user_id: users[2].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 4,
            rating: 5,
            text: 'Fourth test review!',
            menu_item_id: menuItem[0].id,
            user_id: users[3].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 5,
            rating: 1,
            text: 'Fifth test review!',
            menu_item_id: menuItem[menuItem.length - 1].id,
            user_id: users[0].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 6,
            rating: 2,
            text: 'Sixth test review!',
            menu_item_id: menuItem[menuItem.length - 1].id,
            user_id: users[2].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 7,
            rating: 5,
            text: 'Seventh test review!',
            menu_item_id: menuItem[3].id,
            user_id: users[0].id,
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ];
}

function makeExpectedMenu(users, menu, reviews = []) {
    const user = users
        .find(user => user.id === menu.user_id)

    const menuReviews = reviews
        .filter(review => review.menu_item_id === menu.id)

    const number_of_reviews = menuReviews.length
    const average_review_rating = calculateAverageReviewRating(menuReviews)

    return {
        id: menu.id,
        image: menu.image,
        title: menu.title,
        description: menu.description,
        date_created: menu.date_created,
        number_of_reviews,
        average_review_rating,
        user: {
            id: user.id,
            user_name: user.user_name,
            full_name: user.full_name,
            nickname: user.nickname,
            date_created: user.date_created,
        },
    }
}

function calculateAverageReviewRating(reviews) {
    if (!reviews.length) return 0

    const sum = reviews
        .map(review => review.rating)
        .reduce((a, b) => a + b)

    return Math.round(sum / reviews.length)
}

function makeExpectedMenuReviews(users, menuId, reviews) {
    const expectedReviews = reviews
        .filter(review => review.menu_item_id === menuId)

    return expectedReviews.map(review => {
        const reviewUser = users.find(user => user.id === review.user_id)
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
                date_created: reviewUser.date_created,
            }
        }
    })
}

function makeMaliciousMenu(user) {
    const maliciousMenu = {
        id: 911,
        image: 'http://placehold.it/500x500',
        date_created: new Date().toISOString(),
        title: 'Naughty naughty very naughty <script>alert("xss");</script>',
        user_id: user.id,
        description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        pickup_instructions: 'Mos Eisley',
        cuisine_type: 'Bantha fodder',
        diet_type: 'Jawa',
        payment_type: 'Republic credits',
        locations_served: 'Tatooine',
    }
    const expectedMenu = {
        ...makeExpectedMenu([user], maliciousMenu),
        title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
        maliciousMenu,
        expectedMenu,
    }
}

function makeMenuFixtures() {
    const testUsers = makeUsersArray()
    const testMenuItems = makeMenuArray(testUsers)
    const testReviews = makeReviewsArray(testUsers, testMenuItems)
    console.log('in test helper',testMenuItems)
    return {
        testUsers,
        testMenuItems,
        testReviews
    }
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
      fuudi_menu,
      fuudi_users,
      fuudi_reviews
      RESTART IDENTITY CASCADE;`
    )
}

// NEW TEST
function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('fuudi_users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('fuudi_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}


function seedMenuTables(db, users, menuItems, reviews = []) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('fuudi_menu').insert(menuItems)
        await trx.raw(
            `SELECT setval('fuudi_menu_id_seq', ?)`,
            [menuItems[menuItems.length - 1].id],
        )
    })
}

/////////

function seedMaliciousMenuItem(db, user, item) {
    return db
        .into('fuudi_users')
        .insert([user])
        .then(() =>
            db
            .into('fuudi_menu')
            .insert([item])
        )
}

module.exports = {
    makeUsersArray,
    makeMenuArray,
    makeExpectedMenu,
    makeExpectedMenuReviews,
    makeMaliciousMenu,
    makeReviewsArray,

    makeMenuFixtures,
    cleanTables,
    seedUsers,
    seedMenuTables,
    makeAuthHeader,
    seedMaliciousMenuItem
}
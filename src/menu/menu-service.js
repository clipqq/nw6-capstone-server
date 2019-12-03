const xss = require('xss')
const Treeize = require('treeize')

const MenuService = {
  getAllMenuItems(db) {
    return db
      .from('fuudi_menu AS menu-item')
      .select(
        'menu-item.id',
        'menu-item.title',
        'menu-item.date_created',
        'menu-item.description',
        'menu-item.image',
        ...userFields,
        db.raw(
          `count(DISTINCT review) AS number_of_reviews`
        ),
        db.raw(
          `AVG(review.rating) AS average_review_rating`
        ),
      )
      .leftJoin(
        'fuudi_reviews AS review',
        'menu-item.id',
        'review.menu_item_id',
      )
      .leftJoin(
        'fuudi_users AS user',
        'menu-item.user_id',
        'user.id',
      )
      .groupBy('menu-item.id', 'user.id')
  },

  getById(db, id) {
    return MenuService.getAllMenuItems(db)
      .where('menu-item.id', id)
      .first()
  },

  getReviewsForMenuItem(db, menu_item_id) {
    return db
      .from('fuudi_reviews AS review')
      .select(
        'review.id',
        'review.rating',
        'review.text',
        'review.date_created',
        ...userFields,
      )
      .where('review.menu_item_id', menu_item_id)
      .leftJoin(
        'fuudi_users AS user',
        'review.user_id',
        'user.id',
      )
      .groupBy('review.id', 'user.id')
  },

  serializeMenuItems(menuItem) {
    return menuItem.map(this.serializeMenuItem)
  },

  serializeMenuItem(menuItem) {
    const menuItemTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const menuItemData = menuItemTree.grow([ menuItem ]).getData()[0]

    return {
      id: menuItemData.id,
      title: xss(menuItemData.title),
      description: xss(menuItemData.description),
      date_created: menuItemData.date_created,
      image: menuItemData.image,
      user: menuItemData.user || {},
      number_of_reviews: Number(menuItemData.number_of_reviews) || 0,
      average_review_rating: Math.round(menuItemData.average_review_rating) || 0,
    }
  },

  serializeMenuReviews(reviews) {
    return reviews.map(this.serializeMenuReview)
  },

  serializeMenuReview(review) {
    const reviewTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const reviewData = reviewTree.grow([ review ]).getData()[0]

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      menu_item_id: reviewData.menu_item_id,
      text: xss(reviewData.text),
      user: reviewData.user || {},
      date_created: reviewData.date_created,
    }
  },
}

const userFields = [
  'user.id AS user:id',
  'user.user_name AS user:user_name',
  'user.full_name AS user:full_name',
  'user.nickname AS user:nickname',
  'user.date_created AS user:date_created',
  'user.date_modified AS user:date_modified',
]

module.exports = MenuService

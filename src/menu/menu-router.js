const express = require('express')
const MenuService = require('./menu-service')
const { requireAuth } = require('../middleware/jwt-auth')

const menuRouter = express.Router()

menuRouter
  .route('/')
  .get((req, res, next) => {
    MenuService.getAllMenuItems(req.app.get('db'))
      .then(menu => {
        res.json(MenuService.serializeMenuItems(menu))
      })
      .catch(next)
  })

menuRouter
  .route('/:menu_item_id')
  .all(requireAuth)
  .all(checkMenuItemExists)
  .get((req, res) => {
    res.json(res.menu)
  })

menuRouter.route('/:menu_item_id/reviews/')
  .all(requireAuth)
  .all(checkMenuItemExists)
  .get((req, res, next) => {
    MenuService.getReviewsForMenuItem(
      req.app.get('db'),
      req.params.menu_item_id
    )
      .then(reviews => {
        res.json(MenuService.serializeMenuReviews(reviews))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkMenuItemExists(req, res, next) {
  try {
    const menu = await MenuService.getById(
      req.app.get('db'),
      req.params.menu_item_id
    )

    if (!menu)
      return res.status(404).json({
        error: `Menu item doesn't exist`
      })

    res.menu = menu
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = menuRouter

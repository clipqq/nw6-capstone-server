const express = require('express')
const path = require('path')
const OrdersService = require('./orders-service')
const {
  requireAuth
} = require('../middleware/jwt-auth')

const ordersRouter = express.Router()
const jsonBodyParser = express.json()

ordersRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {
      menu_item_id,
      user_id
    } = req.body
    const newOrder = {
      menu_item_id,
      user_id
    }

    // grab req.user for full user info

    // UNCOMMENT LINE BELOW AND DELETE ABOVE `USER_ID` ABOVE WHEN AUTHENTICATION IS WORKING
    // UNCOMMENT `.SET AUTH` IN REVIEWS TEST
    newOrder.user_id = req.user.id
    newOrder.user_full_name = req.user.full_name

    for (const [key, value] of Object.entries(newOrder))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    OrdersService.insertOrderByUserId(
        req.app.get('db'),
        newOrder
      )
      .then(order => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${order.id}`))
          .json(OrdersService.serializeReview(order))
      })
      .catch(next)
  })

module.exports = ordersRouter
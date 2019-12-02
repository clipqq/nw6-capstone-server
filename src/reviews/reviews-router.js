const express = require('express')
const path = require('path')
const ReviewsService = require('./reviews-service')
const {
  requireAuth
} = require('../middleware/jwt-auth')

const reviewsRouter = express.Router()
const jsonBodyParser = express.json()

reviewsRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const {
      menu_item_id,
      rating,
      text,
      user_id
    } = req.body
    const newReview = {
      menu_item_id,
      rating,
      text,
      user_id
    }

    // UNCOMMENT LINE BELOW AND DELETE ABOVE `USER_ID` ABOVE WHEN AUTHENTICATION IS WORKING
    // UNCOMMENT `.SET AUTH` IN REVIEWS TEST
    // newReview.user_id = req.user.id

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    ReviewsService.insertReview(
        req.app.get('db'),
        newReview
      )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review))
      })
      .catch(next)
  })

module.exports = reviewsRouter
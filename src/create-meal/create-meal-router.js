const express = require('express')
const path = require('path')
const CreateMealService = require('./create-meal-service.js')

const createMealRouter = express.Router()
const jsonBodyParser = express.json()

createMealRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const {
      title,
      image,
      locations_served,
      payment_type,
      diet_type,
      cuisine_type,
      description,
      pickup_instructions
    } = req.body

    for (const field of [
        'title',
        'image',
        'locations_served',
        'payment_type',
        'diet_type',
        'cuisine_type',
        'description',
        'pickup_instructions'
      ])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    CreateMealService.checkIfMealExist(
        req.app.get('db'),
        title
      )
      .then(checkIfMealExist => {
        console.log(checkIfMealExist)
        if (checkIfMealExist)
          return res.status(400).json({
            error: `Meal name already exists`
          })

          const newMeal = {
            title,
            image,
            locations_served,
            payment_type,
            diet_type,
            cuisine_type,
            description,
            pickup_instructions
          }

        return CreateMealService.insertMeal(
            req.app.get('db'),
            newMeal
          )
          .then(menu => {
            res
              .status(201)
              // .location(path.posix.join(req.origin, `/menu/${menu.id}`))
              .location(path.posix.join(req.originalUrl, `/${menu.id}`))
          })
      })
      .catch(next)

  })

module.exports = createMealRouter
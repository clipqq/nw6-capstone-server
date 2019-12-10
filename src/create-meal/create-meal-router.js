const express = require('express')
const path = require('path')
const CreateMealService = require('./create-meal-service.js')
const { requireAuth } = require('../middleware/jwt-auth')

const createMealRouter = express.Router()
const jsonBodyParser = express.json()

createMealRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {
            title,
            image,
            locations_served,
            payment_type,
            diet_type,
            cuisine_type,
            description,
            pickup_instructions,
        } = req.body

        const newMeal = {
            title,
            image,
            locations_served,
            payment_type,
            diet_type,
            cuisine_type,
            description,
            pickup_instructions,
        }

        newMeal.user_id = req.user.id

        for (const field of [
            'title',
            'locations_served',
            'payment_type',
            'description',
            'pickup_instructions',
        ])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`,
                })

        CreateMealService.checkIfMealExist(req.app.get('db'), title)
            .then(checkIfMealExist => {
                if (checkIfMealExist)
                    return res.status(400).json({
                        error: `Meal name already exists`,
                    })

                const newMeal = {
                    title,
                    image,
                    locations_served,
                    payment_type,
                    diet_type,
                    cuisine_type,
                    description,
                    pickup_instructions,
                }

                return CreateMealService.insertMeal(
                    req.app.get('db'),
                    newMeal,
                ).then(menu => {
                    res.status(201)
                        .location(
                            path.posix.join(req.originalUrl, `/menu/${menu.id}`),
                        )
                        .json(CreateMealService.serializeNewMeal(menu))
                })
            })
            .catch(next)
    })

module.exports = createMealRouter

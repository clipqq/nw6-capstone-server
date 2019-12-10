const xss = require('xss')
const bcrypt = require('bcryptjs')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const CreateMealService = {
    checkIfMealExist(db, title) {
        return db('fuudi_menu')
            .where({
                title
            })
            .first()
            .then(title => !!title)
    },
    insertMeal(db, newMeal) {
        return db
            .insert(newMeal)
            .into('fuudi_menu')
            .returning('*')
            .then(([meal]) => meal)
    },

    serializeNewMeal(meal) {
        return {
          id: meal.id,
          title: xss(meal.text),
          image: xss(meal.image),
          locations_served: xss(meal.locations_served),
          payment_type: meal.payment_type,
          diet_type: meal.diet_type,
          cuisine_type: xss(meal.cuisine_type),
          description: xss(meal.description),
          pickup_instructions: xss(meal.pickup_instructions),
          date_created: meal.date_created,
          user: meal.user || {},
        }
      }
}

module.exports = CreateMealService
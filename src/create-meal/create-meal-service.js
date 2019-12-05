const xss = require('xss')
const bcrypt = require('bcryptjs')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const CreateMealService = {
    checkIfMealExist(db, meal) {
        return db('fuudi_menu')
            .where({
                title: meal
            })
    },
    insertMeal(db, newMeal) {
        return db
            .insert(newMeal)
            .into('fuudi_menu')
            .returning('*')
            .then(([meal]) => meal)
            .catch(error)
    }
}

module.exports = CreateMealService
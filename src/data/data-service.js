const xss = require("xss");
const bcrypt = require("bcryptjs");
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const DataService = {
    addJsonData(db, newDataset) {
        console.log(newDataset)
        return db("tables")
        .insert(newDataset)
    },
    deleteJsonData(db, table_id) {
        return db
        .from('tables')
        .where('id', table_id)
        .del()
        .then(function(res) {
            console.log(res)
        })
    },
    getAllUserTables(db, user_id) {
        return db
        .from('tables')
        .select('*')
        .where('user_id', user_id)
    },
    getTableById(db, table_id) {
        return db
        .from('tables')
        .select('*')
        .where('id', table_id)
        .first()
    }
};

module.exports = DataService;

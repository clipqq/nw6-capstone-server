const xss = require("xss");
const bcrypt = require("bcryptjs");
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const DataService = {
  addJsonData(db, newDataset) {
    return db("tables")
      .insert(newDataset)
      .returning("*")
      .then(([table]) => table)
      .then(table => DataService.getTableById(db, table.id));
  },
  deleteJsonData(db, table_id) {
    return db
      .from("tables")
      .where("id", table_id)
      .del()
      .then(function(res) {
        console.log(res);
      });
  },
  getAllUserTables(db, user_id) {
    return db
      .from("tables")
      .select("*")
      .where("user_id", user_id);
  },
  getTableById(db, table_id) {
    return db
      .from("tables")
      .select("*")
      .where("id", table_id)
      .first();
  },
  updateTable(db, table_id, newColumns) {
    return db("tables")
    .where("id", table_id)
    .update(newColumns)
    .returning("*")
    .then(([table]) => table)
    .then(table => DataService.getTableById(db, table.id));
  }
};

module.exports = DataService;

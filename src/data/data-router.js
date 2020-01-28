const express = require("express");
const DataService = require("./data-service");
const UserService = require("../user/user-service");

const dataRouter = express.Router();
const jsonBodyParser = express.json();

dataRouter
  .route("/")

  .get((req, res, next) => {
    const user_name = req.headers.user_name;
    UserService.getUserId(req.app.get("db"), user_name)
      .then(userInfo => {
        user_id = userInfo.id;
        DataService.getAllUserTables(req.app.get("db"), user_id).then(
          tables => {
            // let tableNames = [];
            // for (let i = 0; i < tables.length; i++) {
            //   tableNames.push(tables[i].table_name);
            // }
            res.json(tables);
          }
        );
      })
      .catch(next);
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { user_name, table_name } = req.headers;
    const data = JSON.stringify(req.body);

    UserService.getUserId(req.app.get("db"), user_name)
      .then(user_id => {
        const newDataset = {
          data: data,
          user_id: user_id.id,
          table_name: table_name
        };

        return DataService.addJsonData(req.app.get("db"), newDataset).then(
          user => {
            res.status(201).send({ message: "Successful Upload" });
          }
        );
      })
      .catch(next);
  });

dataRouter
  .route("/:table_id")

  .all((req, res, next) => {
    const { table_id } = req.params;
    DataService.getTableById(req.app.get("db"), table_id)
      .then(table => {
        if (!table) {
          return res.status(404).json({
            message: "Table Not Found"
          });
        }
        res.table = table
        next()
      })
      .catch(next);
  })

  .get((req, res) => {
    console.log(res.table)
    res.status(200).json(res.table)
  })
  
  .delete((req, res) => {
  const { table_id } = req.params;
      DataService.deleteJsonData(req.app.get("db"), table_id)
      res.status(200).send({ message: `Successfully deleted table ${table_id}.` }).end()
});

module.exports = dataRouter;

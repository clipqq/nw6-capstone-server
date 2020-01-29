const express = require("express");
const DataService = require("./data-service");

const dataRouter = express.Router();
const jsonBodyParser = express.json();

dataRouter
  .route("/")

  .get((req, res, next) => {
    const user_id = req.headers.user_id;
    DataService.getAllUserTables(req.app.get("db"), user_id)
      .then(tables => {
        res.json(tables);
      })
      .catch(next);
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { user_id, table_name } = req.headers;

    const data = JSON.stringify(req.body);

    if (!user_id || !table_name) {
      return res
        .status(400)
        .send({
          message:
            "Please pass both the user_id and the future table_name as headers when posting a new table."
        });
    }
    const newDataset = {
      data: data,
      user_id: user_id,
      table_name: table_name
    };

    return DataService.addJsonData(req.app.get("db"), newDataset)
      .then(user => {
        res.status(201).send({ message: "Successful Upload" });
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
        res.table = table;
        next();
      })
      .catch(next);
  })

  .get((req, res) => {
    res.status(200).json(res.table);
  })

  .delete((req, res) => {
    const { table_id } = req.params;
    DataService.deleteJsonData(req.app.get("db"), table_id);
    res
      .status(200)
      .send({ message: `Successfully deleted table ${table_id}.` })
      .end();
  });

module.exports = dataRouter;

const express = require("express");
const DataService = require("./data-service");
const path = require("path");
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
    const { user_id, table_name, table_type } = req.headers;

    const data = JSON.stringify(req.body);

    if (!user_id || !table_name) {
      return res.status(400).send({
        message:
          "Please pass both the user_id and the future table_name as headers when posting a new table."
      });
    }
    const newDataset = {
      data: data,
      user_id: user_id,
      table_name: table_name,
      table_type: table_type
    };

    return DataService.addJsonData(req.app.get("db"), newDataset)
      .then(table => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${table.id}`))
          .json({
            message: "Successfully uploaded.",
            location: `${req.originalUrl}/${table.id}`
          });
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

  .patch(jsonBodyParser, (req, res) => {
    const { table_id } = req.params;
    const { table_name, table_type } = req.body

    let columnsToBeUpdated = {}

    if(!table_name && !table_type) {
      res.status(400).send({ message: `You must supply either a new table_name or a new table_type in order to update table information.` })
    }
    if(!table_name) {
      columnsToBeUpdated = {
        table_type: table_type
      }
    }
    if(!table_type) {
      columnsToBeUpdated = {
        table_name: table_name
      }
    }
    if(table_name && table_type) {
      columnsToBeUpdated = {
        table_name: table_name,
        table_type: table_type
      }
    }
    DataService.updateTable(req.app.get("db"), table_id, columnsToBeUpdated)
    .then(updatedTable => {
      res.status(201).send({ message: `Successfully updated table ${table_id}.`})
    })

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

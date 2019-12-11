const express = require('express');

const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/car-dealer.db3'
  },
  useNullAsDefault: true
});

const router = express.Router();

//Read
router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed To Retrieve Cars'
      });
    });
});

//Create
router.post('/', (req, res) => {
  const carData = req.body;
  db('cars')
    .insert(carData)
    .then(ids => {
      db('cars')
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed To Add Record'
      });
    });
});

module.exports = router;

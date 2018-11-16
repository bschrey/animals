const express = require('express');
const router = express.Router();
const animals = require('../models/animals.js');
const Animal = require('../models/Animal.js');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let allAnimals = await animals.idlist();
  res.status(200).json(JSON.stringify(allAnimals));
});

router.get('/:id', async (req, res, next) => {
  let animal = await animals.read(req.params.id);
  console.log(JSON.stringify(animal));
  res.status(200).send(JSON.stringify(animal));
});

router.post('/', async (req, res, next) => {
	let animal = await animals.create(req.body.id, req.body.name, req.body.type);
	console.log(JSON.stringify(animal));
	res.status(200).json(JSON.stringify(animal));

});

module.exports = router;

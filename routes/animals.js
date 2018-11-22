const express = require('express');
const router = express.Router();
const animals = require('../models/animals.js');
const Animal = require('../models/Animal.js');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
	  	let allAnimals = await animals.keylist();
	  	res.status(200).json(JSON.stringify(allAnimals));
	} catch(e) {
		console.log(e);
		res.status(500).send({"error": "server error"});
	}
});

router.get('/:key', async (req, res, next) => {
    try {
	  	let animal = await animals.read(req.params.key);
	  	console.log(JSON.stringify(animal));
	  	if(animal) {
			res.status(200).send(JSON.stringify(animal));
	  	} else {
	  		res.status(400).send({"error": "not found"});
	  	}
	} catch(e) {
		console.log(e);
		res.status(500).send({"error": "server error"});
	}
});

router.post('/', async (req, res, next) => {
    try {
		let animal = await animals.create(req.body.key, req.body.name, req.body.type, req.body.weight);
		console.log(JSON.stringify(animal));
		res.status(200).json(JSON.stringify(animal));
	} catch(e) {
		console.log(e);
		res.status(500).send({"error": "server error"});
	}
});

router.put('/', async (req, res, next) => {
    try {
		let animal = await animals.update(req.body.key, req.body.name, req.body.type, req.body.weight);
		console.log(JSON.stringify(animal));
		res.status(200).json(JSON.stringify(animal));
	} catch(e) {
		console.log(e);
		res.status(500).send({"error": "server error"});
	}
});

router.delete('/:key', async (req, res, next) => {
    try {
	  	let animal = await animals.destroy(req.params.key);
	  	console.log(JSON.stringify(animal));
	  	if(animal) {
			res.status(200).send(JSON.stringify(animal));
	  	} else {
	  		res.status(400).send({"error": "not found"});
	  	}
	} catch(e) {
		console.log(e);
		res.status(500).send({"error": "server error"});
	}
});

module.exports = router;

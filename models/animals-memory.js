const Animal = require('./Animal');

let animals = [];

exports.update = exports.create = async function(key, name, type, weight, status) {
	try {
		animals[key] = new Animal(key, name, type, weight, status);
		return animals[key];
	} catch(e) {
		console.log(e);
		throw new Error(`Error creating Animal.`);
	}
};

exports.read = async function(key) {
	try {
		if(animals[key]) {
			return animals[key];
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error reading Animals ${key}.`);
	}
};

exports.destroy = async function(key) {
	try {
		if(animals[key]) {
			let animal = animals[key];
			delete animals[key];
			return animal;
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error destroying Animals ${key}.`);
	} 
}

exports.keylist = async function() { return Object.keys(animals); };
exports.count = async function() { return animals.length; };
exports.close = async function() { };
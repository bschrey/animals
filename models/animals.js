const Animal = require('./Animal');

let animals = [];

exports.update = exports.create = async function(id, name, type, weight, status) {
	try {
		animals[id] = new Animal(id, name, type, weight, status);
		return animals[id];
	} catch(e) {
		console.log(e);
		throw new Error(`Error creating Animal.`);
	}
};

exports.read = async function(id) {
	try {
		if(animals[id]) {
			return animals[id];
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error reading Animals ${id}.`);
	}
};

exports.destroy = async function(id) {
	try {
		if(animals[id]) {
			delete animals[id];
		} else {
			return null;
		}
	} catch(e) {
		console.log(e);
		throw new Error(`Error destroying Animals ${id}.`);
	} 
}

exports.idlist = async function() { return Object.keys(animals); };
exports.count = async function() { return animals.length; };
exports.close = async function() { };
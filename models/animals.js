const Animal = require('./Animal');

let animals = [];

exports.update = exports.create = async function(id, name, type) {
	animals[id] = new Animal(id, name, type);
	return animals[id];
};

exports.read = async function(id) {
	if(animals[id]) {
		return animals[id];
	} else {
		throw new Error(`Animals ${id} does not exist.`);
	}
};

exports.destroy = async function(id) {
	if(animals[id]) {
		delete animals[id];
	} else {
		throw new Error(`Animals ${id} does not exist.`);
	}
}

exports.idlist = async function() { return Object.keys(animals); };
exports.count = async function() { return animals.length; };
exports.close = async function() { };
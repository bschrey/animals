const _animal_key = Symbol('key');
const _animal_name = Symbol('name');
const _animal_type = Symbol('type');
const _animal_weight = Symbol('weight');

module.exports = class Animal {
	constructor(key, name, type, weight, status) {
		this[_animal_key] = key;
		this[_animal_name] = name;
		this[_animal_type] = type;
		this[_animal_weight] = weight;
	}

	get key() {return this[_animal_key]; }
	set key(newKey) { this[_animal_key] = newKey; }

	get name() {return this[_animal_name]; }
	set name(newName) { this[_animal_name] = newName; }

	get type() {return this[_animal_type]; }
	set type(newType) { this[_animal_type] = newType; }

	get weight() {return this[_animal_weight]; }
	set weight(newWeight) { this[_animal_weight] = newWeight; }

	toJSON() {
		let {key, name, type, weight} = this;
		return {key, name, type, weight};
	}

	static fromJSON(json) {
		var data = JSON.parse(json);
		var animal = new Animal(data.key, data.name, data.type, data.weight);
		return animal;
	}

};
const _animal_id = Symbol('id');
const _animal_name = Symbol('name');
const _animal_type = Symbol('type');

module.exports = class Animal {
	constructor(id, name, type) {
		this[_animal_id] = id;
		this[_animal_name] = name;
		this[_animal_type] = type;
	}

	get id() {return this[_animal_id]; }
	set id(newId) { this[_animal_id] = newId; }

	get name() {return this[_animal_name]; }
	set name(newName) { this[_animal_name] = newName; }

	get type() {return this[_animal_type]; }
	set type(newType) { this[_animal_type] = newType; }

	toJSON() {
		let {id, name, type} = this;
		return {id, name, type};
	}

	static fromJSON(json) {
		var data = JSON.parse(json);
		var animal = new Animal(data.id, data.name, data.type);
		return animal;
	}

};
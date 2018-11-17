const _animal_id = Symbol('id');
const _animal_name = Symbol('name');
const _animal_type = Symbol('type');
const _animal_weight = Symbol('weight');
const _animal_status = Symbol('status');

module.exports = class Animal {
	constructor(id, name, type, weight, status) {
		this[_animal_id] = id;
		this[_animal_name] = name;
		this[_animal_type] = type;
		this[_animal_weight] = weight;
		this[_animal_status] = status;
	}

	get id() {return this[_animal_id]; }
	set id(newId) { this[_animal_id] = newId; }

	get name() {return this[_animal_name]; }
	set name(newName) { this[_animal_name] = newName; }

	get type() {return this[_animal_type]; }
	set type(newType) { this[_animal_type] = newType; }

	get weight() {return this[_animal_weight]; }
	set weight(newWeight) { this[_animal_weight] = newWeight; }

	get status() {return this[_animal_status]; }
	set status(newStatus) { this[_animal_status] = newStatus; }

	toJSON() {
		let {id, name, type, weight, status} = this;
		return {id, name, type, weight, status};
	}

	static fromJSON(json) {
		var data = JSON.parse(json);
		var animal = new Animal(data.id, data.name, data.type, data.weight, data.status);
		return animal;
	}

};
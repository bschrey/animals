const mongoose = require('mongoose');

const AnimalModel = mongoose.model('animal', {
	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	weight: {
		type: Number,
		default: null
	},
	status: {
		type: String,
		default: null
	}
});

module.exports = {AnimalModel};

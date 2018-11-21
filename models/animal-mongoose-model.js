const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
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
}, {
    timestamps: true
});

const AnimalModel = mongoose.model('animal', AnimalSchema);

module.exports = {AnimalModel};

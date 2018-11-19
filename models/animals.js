const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('../db/mongoose');
const {AnimalModel} = require('./animal-mongoose-model');
const Animal = require("./Animal");

exports.create = function(key, name, type, weight, status) { 
    return new Promise((resolve, reject) => {
        try {
            let animalModel = new AnimalModel({
                name, name,
                type: type,
                weight: weight,
                status: status
            });

            animalModel.save().then((doc) => {
                console.log(doc);
                let animal = new Animal(doc._id, doc.name, doc.type, doc.weight, doc.status);
                console.log(animal);
                resolve(animal);
            }, (err) => {
                console.log(e);
                reject(`Error creating Animal.`);
            });
        } catch(e) {
            console.log(e);
            reject(`Error creating Animal.`);
        }
    });
};
 
exports.update = function(key, name, type, weight, status) {  
    return new Promise((resolve, reject) => {
        try {
            if(!ObjectID.isValid(key)) {
                console.log('Key not valid');
                reject(`Key is not valid.`);
            }   

            AnimalModel.findByIdAndUpdate(key,
                {$set: {name: name, type: type, weight: weight, status: status }}, {new: true}).then((animal) => {
                    if(!animal) {
                        reject(`Animal not found with key ${key}.`);
                    }
                    resolve(animal);
                }).catch((err) => {
                    reject(`Error updating Animal.`);
                });

        } catch(e) {
            console.log(e);
            reject(`Error creating Animal.`);
        }
    });
};

exports.read = function(key) { 
    return new Promise((resolve, reject) => {
        try {
            if(!ObjectID.isValid(key)) {
                console.log('Key not valid');
                reject(`Error Animal key is invalid: ${key}.`);
            }   

            AnimalModel.findById(key).then((doc) => {
                if(!doc) {
                    console.log('Key not found');
                    resolve(null);
                }

                let animal = new Animal(doc._id, doc.name, doc.type, doc.weight, doc.status);
                resolve(animal);

            }).catch((err) => {
                console.log(err)
                reject(`Error reading Animal ${key}.`);
            });

        } catch(e) {
            console.log(e);
            reject(`Error reading Animal ${key}.`);
        }
    });
};

exports.destroy = function(key) { 
    return new Promise((resolve, reject) => {
        try {
            if(!ObjectID.isValid(key)) {
                console.log('Key not valid');
                reject(`Key is not valid.`);
            }   

            AnimalModel.findByIdAndRemove(key).then((animal) => {
                if(!animal) {
                    console.log('Key not removed');
                    reject(`Key not removed.`);
                }
                console.log(animal);
                resolve(animal);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        } catch(e) {
            console.log(e);
            reject(`Error destroying Animal ${key}.`);
        }
    });
};

exports.keylist = function() { 
    return new Promise((resolve, reject) => {
        AnimalModel.find().distinct('_id').then((animalIds) => {
            resolve(animalIds);
        }, (err) => {
            reject(`Error getting key list of Animals.`);
        });
    });
};

exports.count = function() { 
    return new Promise((resolve, reject) => {
        AnimalModel.count().then((count) => {
            resolve(count);
        }, (err) => {
            reject(`Error getting key list of Animals.`);
        });
    });};

exports.close = function() {};
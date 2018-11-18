const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const Animal = require('./Animal');
const mongodb = require('mongodb'); 
const MongoClient = mongodb.MongoClient;
const DBG = require('debug');
const debug = DBG('notes:notes-mongodb'); 
const error = DBG('notes:error-mongodb'); 

var client;

async function connectDB() { 
    if (!client) client = await MongoClient.connect(process.env.MONGO_URL);
    return { 
        db: client.db(process.env.MONGO_DBNAME), 
        client: client
    };
}

exports.create = async function(key, name, type, weight, status) { 
    const { db, client } = await connectDB();
    const animal = new Animal(key, name, type, weight, status); 
    const collection = db.collection('animals'); 
    await collection.insertOne({ 
        animalkey: key, name: name, type: type, weight: weight, status: status 
    });
    return animal;
}
 
exports.update = async function(key, name, type, weight, status) {  
    const { db, client } = await connectDB();
    const animal = new Animal(key, name, type, weight, status); 
    const collection = db.collection('animals'); 
    await collection.updateOne({ animalkey: key }, 
            { $set: { name: name, type: type, weight: weight, status: status } });
    return animal;
}

exports.read = async function(key) { 
    const { db, client } = await connectDB();
    const collection = db.collection('animals');
    const doc = await collection.findOne({ animalkey: key });
    if(doc) {
        const animal = new Animal(doc.animalkey, doc.name, doc.type, doc.weight, doc.status);
        return animal; 
    } else {
        return null;
    }
}

exports.destroy = async function(key) { 
    const { db, client } = await connectDB();
    const collection = db.collection('animals'); 

    const doc = await collection.findOne({ animalkey: key });
    if(doc) {
        await collection.findOneAndDelete({ animalkey: key });
        const animal = new Animal(doc.animalkey, doc.name, doc.type, doc.weight, doc.status);
        return animal; 
    } else {
        return null;
    }
}

exports.keylist = async function() { 
    const { db, client } = await connectDB();
    debug(`keylist ${util.inspect(db)}`);
    const collection = db.collection('animals'); 
    const keyz = await new Promise((resolve, reject) => { 
        var keyz = []; 
        collection.find({}).forEach( 
            animal => { keyz.push(animal.animalkey); }, 
            err  => { 
                if (err) reject(err); 
                else resolve(keyz); 
            } 
        ); 
    }); 
    return keyz;
}

exports.count = async function() { 
    const { db, client } = await connectDB();
    const collection = db.collection('animals');
    const count = await collection.count({});
    return count;
}

exports.close = async function() {
    if (client) client.close();
    client = undefined;
}
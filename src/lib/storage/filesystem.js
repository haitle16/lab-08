'use strict';

import fs from 'fs';
import uuid from 'uuid/v1';
import util from 'util';
// import database from '../../../data/db.json';


const writeFile = util.promisify(fs.writeFile);
const databaseFile = `${__dirname}/../../../data/db.json`;
let database = require(databaseFile);

const storage = {};


/*
{
  12345: {title: 'hi', text: 'hello'},
  23456: {title: 'hey', text: 'yo'}
 */

storage.find = query => {
    let id = query && query._id;
    return new Promise( (resolve,reject) => {

        if ( id ) {
            if (database[id]) {resolve(database[id]);}
            else { reject('Record Not Found')}
            resolve(database[id]);
        }
        else {
            const results = Object.keys(database).map( key => {
                return database[key];
            });
            resolve(results);
        }

    });
};

storage.delete = id => {
    return new Promise( (resolve,reject) => {
        if ( database[id] ) {
            delete database[id];
            storage.saveDatabase()
                .then ( () => resolve(database[id]))
                .catch (err => reject(err));
        }
        else {
            let response = { error: `${id} not found` };
            reject(response);
        }
    });
};

storage.save = (data) => { // this should handle post, put, patch
    return new Promise( (resolve,reject) => {
        data._id = data._id || uuid();
        let record = Object.assign({}, database[data._id], data);
        database[record._id] = record;
        storage.saveDatabase()
            .then( () => resolve(database[data._id]))
            .catch (err => reject(err));
    });
};

storage.saveDatabase = () =>{
    let data = JSON.stringify(database);
    return writeFile(databaseFile,data)
        .then(result => true)
        .catch( error => error)
}

export default storage;
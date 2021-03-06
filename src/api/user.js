'use strict';

import express from 'express';

import users from '../models/user.js';
// import notes from "../models/notes";

const router = express.Router();

let sendJSON = (data,response) => {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'application/json');
    response.write( JSON.stringify(data) );
    response.end();
};

router.get('/api/v1/users', (request,response,next) => {
    users.find()
        .then( data => {
            const output = {
                count: data.length,
                results: data,
            };
            sendJSON(output, response);
        })
        .catch( next );
});

router.get('/api/v1/users/:id', (request,response,next) => {
    users.find({_id:request.params.id})
        .then( result => sendJSON(result, response) )
        .catch( next );
});

router.post('/api/v1/users', (request,response,next) => {
    users.save(request.body)
        .then( result => sendJSON(result, response) )
        .catch( next );
});

router.put('/api/v1/users/:id', (request,response,next) => {
    //changed to put lose the memory first try.. look up!!
    console.log(request.body);
    users.put(request.params.id, request.body)
        .then( result => sendJSON(result, response) )
        .catch( next );
});

router.patch('/api/v1/users/:id', (request,response,next) => {
    console.log(request.body);
    users.patch(request.params.id, request.body)
        .then( result => sendJSON(result, response) )
        .catch( next );
});

router.delete('/api/v1/users/:id', (request,response,next) => {
    users.delete(request.params.id)
        .then( () => {
            response.statusCode = 200;
            response.end();
        } )
        .catch( console.error );
});

export default router;
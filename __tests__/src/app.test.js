'use strict';

const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('api server', () => {

    it('should respond with a 404 on an invalid route', () => {

        return mockRequest
            .get('/foo')
            .then(results => {
                expect(results.status).toBe(404);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should respond with a 404 on an invalid method', () => {

        return mockRequest
            .post('/api/v1/notes/12')
            .then(results => {
                expect(results.status).toBe(404);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should respond properly on request to /api/v1/notes', () => {

        return mockRequest
            .get('/api/v1/notes')
            .then(results => {
                expect(results.status).toBe(200);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should respond properly on request to /api/v1/notes/:id', () => {

        return mockRequest
            .get('/api/v1/notes/2')
            .then(results => {
                expect(results.status).toBe(200);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should be able to post to /api/v1/notes', () => {

        let obj = {title:'test',text:'foo'};

        return mockRequest
            .post('/api/v1/notes')
            .send(obj)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.title).toEqual(obj.title);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should be able to put to /api/v1/notes/:id', () => {

        let obj = {title:'test',text:'foo', _id:"1"};

        return mockRequest
            .put('/api/v1/notes/1')
            .send(obj)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body._id).toEqual(obj._id);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('USER MODEL should respond with a 404 on an invalid method', () => {

        return mockRequest
            .post('/api/v1/notes/12')
            .then(results => {
                expect(results.status).toBe(404);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('USER MODEL should respond properly on request to /api/v1/notes', () => {

        return mockRequest
            .get('/api/v1/notes')
            .then(results => {
                expect(results.status).toBe(200);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('USER MODEL should respond properly on request to /api/v1/notes/:id', () => {

        return mockRequest
            .get('/api/v1/notes/2')
            .then(results => {
                expect(results.status).toBe(200);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('USER MODEL should be able to post to /api/v1/notes', () => {

        let obj = {title:'test',text:'foo'};

        return mockRequest
            .post('/api/v1/notes')
            .send(obj)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body.title).toEqual(obj.title);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

    it('should be able to put to /api/v1/notes/:id', () => {

        let obj = {title:'test',text:'foo', _id:"1"};

        return mockRequest
            .put('/api/v1/notes/1')
            .send(obj)
            .then(results => {
                expect(results.status).toBe(200);
                expect(results.body._id).toEqual(obj._id);
            })
            .catch(err => {
                expect(err).not.toBeDefined();
            });

    });

});

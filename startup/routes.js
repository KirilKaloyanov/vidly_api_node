const express = require('express');
const cors = require('cors');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {

    app.use(express.json());
    app.use(cors());

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    app.use(error);
}
const winston = require('winston');

module.exports = function(err, req, res, next) {
    winston.log('error', err.message, err); //winston.error(err.message);
    res.status(500).send('Something failed.')
}

//Levels for logging
//error
//warn
//info  if we set level to info this will log error, warn and info messages
//verbose
//debug
//silly

const rateLimit = require('express-rate-limit')
const {logEvents} = require('./logger')

const loginLimit = rateLimit({
    windowMS: 60 * 1000,
    max: 5,
    message: 
        {message: 'Too many login attempts from this IP, please try again after a 60 second pause'},
    handler: (req, res, next, options) => {
        logEvents(`${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = rateLimit
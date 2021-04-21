const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const logger = require('./logger')
const User = require('../models/user')



class InvalidUserError extends Error {
    constructor(message){
        super(message)
        this.name = 'InvalidUserError'
    }

}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    switch (error.name) {

    case 'CastError':
        return response.status(400).send({ error: 'invalid id format' })
    case 'ValidationError':
        return response.status(400).json({ error: error.message })
    case 'JsonWebTokenError':
        return response.status(401).send({ error: 'Token is missing or unauthorized' })
    case 'TokenExpiredError':
        return response.status(401).send({ error: 'Token is expired' })
    case 'InvalidUserError': 
        return response.status(401).json({ error: error.message })
    default:
        next(error)
    }
}


const getTokenFrom = (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) =>  {

    const decodedToken = jwt.verify(request.token, config.SECRET)

    const user = await User.findById(decodedToken.id)

    if(!user) throw new InvalidUserError('User was not found in the system')

    request.user = user

    next()
}




module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    getTokenFrom,
    userExtractor
}

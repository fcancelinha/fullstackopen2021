const logger = require('./logger')

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



module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    getTokenFrom
}

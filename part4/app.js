const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('connecting to MongoDB using', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info(`connection established... [OK]`)
    })
    .catch((error) => {
        logger.error('connection to mongoDB failed | error :', error.message)
    })

app.use(
    cors(),
    express.static('build'),
    express.json()
)

app.use('/api/blogs', notesRouter)

app.use(
    middleware.requestLogger,
    middleware.unknownEndpoint,
    middleware.errorHandler
)

module.exports = app


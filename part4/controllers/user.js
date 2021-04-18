const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response) => {

    const body = request.body

    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

module.exports = userRouter
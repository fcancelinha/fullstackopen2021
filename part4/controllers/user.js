const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.get('/', async (request, response) => {

    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response) => {

    const body = request.body

    if(body.password.length <= 3 || body.username.length <= 3) {
        return response.status(400).json({
            error: 'Passwords and Usernames must be at least 3 characters long' 
        })
    }
       
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
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.get('/', async (request, response) => {

    const users = await User.find({}, {passwordHash: 0}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users)
})

userRouter.post('/', async (request, response) => {

    const body = request.body

    if(body.password.length < 3 || body.username.length < 3) {
        return response.status(400).json({
            error: 'Passwords and Usernames must be at least 3 characters long' 
        })
    }
       
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = userRouter
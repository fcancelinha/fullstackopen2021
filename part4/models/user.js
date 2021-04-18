const mongoose = require('mongoose')
const uniqueValidation = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.plugin(uniqueValidation  )

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.password
    },
})

module.exports = mongoose.model('User', userSchema, 'User')
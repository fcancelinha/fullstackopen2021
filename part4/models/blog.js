const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema, 'Blog')

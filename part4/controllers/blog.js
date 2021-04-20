
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


const decodeToken = (request, response) => {

    const decodedToken = jwt.verify(request.token, config.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    return decodedToken
}


blogRouter.get('/', async (request, response,) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

    const body = request.body

    const token = decodeToken(request, response)

    const user = await User.findById(token.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

    const token = decodeToken(request, response)

    const user = await User.findById(token.id)
    const blog = await Blog.findById(request.params.id)

    if(!user)
        return response.status(401).send({ error: 'User is not recognized by the system' })

    if(user.id.toString() !== blog.id.toString()) {
        return response.status(401).send({ error: 'User is not the author and does not have deletion privileges for this blog' })
    }
        
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {

    const content = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
    response.status(204).json(content)
})


module.exports = blogRouter

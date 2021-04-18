// eslint-disable-next-line new-cap
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, ) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {

    console.log("request params", request.params.id)

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})





module.exports = blogRouter

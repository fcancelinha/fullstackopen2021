
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response, ) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    
    const body = request.body
    const user = await User.findOne({})

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

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogRouter.put('/:id', async(request, response) => {

    const content = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
    response.status(204).json(content)
})


module.exports = blogRouter

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')
const logger = require('../utils/logger')

// supertest serves as an HTTP tester

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as JSON', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('blog has unique identifier', async () => {
    const blog = await api.get('/api/blogs')

    expect(blog.body[0].id).toBeDefined()

})


test('POST request creates a new blog post', async () => {

    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const systemObj = await api.get('/api/blogs')

    expect(systemObj.body).toHaveLength(helper.initialBlogs.length + 1)

    const dbObj = await Blog.find({ title : 'Canonical string reduction' })

    expect(dbObj[0].title).toBe('Canonical string reduction')
})


test('if the likes prop is missing from the request, it will default 0', async () => {
    
    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const blog = await api.get('/api/blogs')

    expect(blog.body[2].likes).toBeDefined()
    expect(blog.body[2].likes).toBe(0)
    
})

test('if the title and url properties are missing from the request data, receive 400', async () => {
    const newBlog = {
        author: 'Edsger W. Dijkstra'
    }

    await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)


})


afterAll(() => {
    logger.info('Closing connection to database...')
    mongoose.connection.close()
})

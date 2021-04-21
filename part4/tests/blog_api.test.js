const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/blog_helper')

// supertest serves as an HTTP tester
const api = supertest(app)
let token = null

beforeEach(async () => {
        
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const response = await api.post('/api/login').send({ username: 'bacardi', password: 'p@ssw0rd' })
    token = response.body.token
})


test('blogs are returned as JSON', async() => {
    await api.get('/api/blogs')
        .auth(token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('blog has unique identifier', async () => {
    const blog = await api
        .get('/api/blogs')
        .auth(token, { type: 'bearer' })
        
    expect(blog.body[0].id).toBeDefined()

})


test('POST request creates a new blog post', async () => {

    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '607eed3ec8929512f67f03a5'
    }

    await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const systemObj = await api.get('/api/blogs').auth(token, { type: 'bearer' })

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
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blog = await api.get('/api/blogs').auth(token, { type: 'bearer' })

    expect(blog.body[2].likes).toBeDefined()
    expect(blog.body[2].likes).toBe(0)
    
})

test('if the title and url properties are missing from the request data, receive 400', async () => {
    const newBlog = {
        author: 'Edsger W. Dijkstra'
    }

    await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(newBlog)
        .expect(400)


})

test('deletion of a single blog', async () => {
    
    const response = await api.get('/api/blogs').auth(token, { type: 'bearer' })
    const blog = response.body
                    
    await api
        .delete(`/api/blogs/${blog[0].id}`)
        .auth(token, { type: 'bearer' })
        .expect(204)
})

test('update the property likes of a single blog', async () => {
    
    const response = await api.get('/api/blogs').auth(token, { type: 'bearer' })

    const blog = response.body
    blog[0].likes = 20

    await api
        .put(`/api/blogs/${blog[0].id}`)
        .auth(token, { type: 'bearer' })
        .send(blog)
        .expect(204)

})

test('ensure adding a blog without a token fails and returns 401', async() => {

    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        user: '607f74a4d4b983ad2100ebde'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

})


afterAll(() => {
    mongoose.connection.close()
})

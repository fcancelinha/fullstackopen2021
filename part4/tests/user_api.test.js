const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')


const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})


describe('check when a user', () => {

    test('has an invalid format it is not created', async () =>{

        const invalidUser = {
            username: 'fi',
            name: 'userTest',
            password : 'ab',
        }

        await api.post('/api/users')
            .send(invalidUser)
            .expect(400)

    })

    test('has an invalid format, appropriate error message is returned', async () =>{

        const invalidUser = {
            username: 'fi',
            name: 'userTest',
            password : 'ab',
        }

        const message = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
            
        expect(message.body.error).toBe('Passwords and Usernames must be at least 3 characters long')
            
    })

    test('with an already existing username fails to get added to the database', async () =>{

        const user = {
            username: 'bacardi',
            name: 'userTest',
            password : 'p@ssw0rd',
        }

        const invalidDuplicateUser = {
            username: 'fi',
            name: 'userTest',
            password : 'ab',
        }

        await api.post('/api/users')
            .send(user)
            .expect(201)

        await api.post('/api/users')
            .send(invalidDuplicateUser)
            .expect(400)           

    })


})


afterAll(() => {
    mongoose.connection.close()
})
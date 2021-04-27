/* eslint-disable*/
import LoginForm from '../../src/components/LoginForm'

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const newUser = {
            username: 'bacardi',
            name: 'bacardi',
            password: 'p@ssw0rd'
        }

        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000')

    })

    it('Login form is shown', function () {
        cy.get('.login-form')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('bacardi')
            cy.get('#password').type('p@ssw0rd')
            cy.get('#login-button').click()
            cy.contains('bacardi is logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('notBacardi')
            cy.get('#password').type('notP@ssw0rd')
            cy.get('#login-button').click()
            cy.contains('Username or password invalid')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
			cy.contains('Login').click()
			cy.get('#username').type('bacardi')
			cy.get('#password').type('p@ssw0rd')
			cy.get('#login-button').click()
		})

        it('add a new blog', function () {
			cy.contains('Create').click()
			cy.get('.blog-title').type('something')
			cy.get('.blog-author').type('something author')
			cy.get('.blog-url').type('something.com')
			cy.get('#submit-blog').click()
			cy.contains('something')
		})

        it('can like a blog', function (){
            cy.contains('Create').click()
			cy.get('.blog-title').type('something')
			cy.get('.blog-author').type('something author')
			cy.get('.blog-url').type('something.com')
			cy.get('#submit-blog').click()
			

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })

        it('can like a blog', function (){
            cy.contains('Create').click()
			cy.get('.blog-title').type('something')
			cy.get('.blog-author').type('something author')
			cy.get('.blog-url').type('something.com')
			cy.get('#submit-blog').click()
			

            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains('Blog deleted with success')
        })


    })


 
})

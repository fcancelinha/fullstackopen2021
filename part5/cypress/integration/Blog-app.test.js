/* eslint-disable*/
import LoginForm from '../../src/components/LoginForm'

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        
        const newUser = {
            username: 'bacardi',
            name: 'bacardi',
            password: 'p@ssw0rd'
        }

        cy.request('POST', 'http://localhost:3003/api/users', newUser)
        cy.visit('http://localhost:3000')

    })

    it('Login form is shown', function() {
        cy.get('.login-form')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('bacardi')
			cy.get('#password').type('p@ssw0rd')
			cy.get('#login-button').click()
			cy.contains('bacardi is logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('notBacardi')
			cy.get('#password').type('notP@ssw0rd')
			cy.get('#login-button').click()
			cy.contains('Username or password invalid')
        })
      })
})

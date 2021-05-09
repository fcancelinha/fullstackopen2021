import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('That a Blog Form component', () => {

    /*
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    */

    test('calls the event handler it received as props with the right details when a new blog is created', () => {

        const mockHandler = jest.fn()

        const component = render(
            <BlogForm blogHandler={mockHandler} />
        )

        const blogTitleInput = component.container.querySelector('.blog-title')
        const blogAuthorInput = component.container.querySelector('.blog-author')
        const blogUrlInput = component.container.querySelector('.blog-url')
        const blogForm = component.container.querySelector('.blog-form')

        fireEvent.change(blogTitleInput, {
            target: { value: 'React patterns' }
        })

        fireEvent.change(blogAuthorInput, {
            target: { value: 'Michael Chan' }
        })

        fireEvent.change(blogUrlInput, {
            target: { value: 'https://reactpatterns.com/' }
        })

        fireEvent.submit(blogForm)


        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].content).toBe(
            {
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
            }
        )

    })


})

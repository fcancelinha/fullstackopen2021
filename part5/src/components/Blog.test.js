import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'




describe('That a blog component', () => {

    const blog = {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    }

    test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {

        const component = render(
            <Blog blog={blog} />
        )

        component.debug()

        expect(component.container).toHaveTextContent('React patterns')
        expect(component.container).toHaveTextContent('Michael Chan')
        expect(component.container.querySelector('.blog-url')).not.toBeVisible()
        expect(component.container.querySelector('.blog-likes')).not.toBeVisible()

    })

    test('url and number of likes are shown when the button is clicked', () => {

        //toggle-view
        const component = render(
            <Blog blog={blog} />
        )

        component.debug()

        const button = component.container.querySelector('.toggle-view')
        fireEvent.click(button)

        expect(component.container.querySelector('.blog-url')).toBeVisible()
        expect(component.container.querySelector('.blog-likes')).toBeVisible()

    })

    test('like button is clicked twice, the event handler the component received as props is called twice', () => {

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} handleLike={mockHandler}/>
        )

        component.debug()

        const button = component.container.querySelector('.like-blog')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })





})
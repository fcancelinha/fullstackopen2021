import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'



describe('That a blog component', () => {

    test('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {

        const blog = {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0,
        }


        const component = render(
            <Blog blog={blog} />
        )

        component.debug()

        expect(component.container).toHaveTextContent('React patterns')
        expect(component.container).toHaveTextContent('Michael Chan')
        expect(component.container.querySelector('.blog-url')).not.toBeVisible()
        expect(component.container.querySelector('.blog-likes')).not.toBeVisible()

    })







})
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import useField from '../hooks/useField'
import { likeBlog } from '../reducers/blogReducer'

const CommentSection = ({blog}) => {

    const dispatch = useDispatch()
    const comment = useField('text')


    const onComment = () => {

        const newBlog = {
            ...blog,
            comments: [
                ...blog.comments,
                comment.value
            ]
        }

        console.log("newComment", newBlog)
        comment.onReset()

        dispatch(likeBlog(newBlog))
    }

    return (
        <div>
            <h4>Comments</h4>
            
            <InputGroup className="mb-3">
                <FormControl
                    {...comment}
                    placeholder="Comment..."
                    aria-label="Comment"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => onComment()}>Comment</Button>
                </InputGroup.Append>
            </InputGroup>
            
            <ul>
                {blog.comments.map(comment => <li key={comment}>{comment}</li> )} 
            </ul>
            
            
        </div>
    )
}

export default CommentSection

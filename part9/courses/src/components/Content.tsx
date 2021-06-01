import React from 'react'
import { CoursePart } from '../models/CoursePart';
import Part from './Part';

const Content = ({content}: {content: CoursePart[]}) => {
    return (
        <div>
            {content.map(content =>
                <Part key={content.name} partContent={content} />
            )}
        </div>
    )
}

export default Content

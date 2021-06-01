import React from 'react'
import { CoursePart } from '../models/CoursePart'

const Part = ({partContent}: {partContent: CoursePart}) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    
    const renderPart = (partContent: CoursePart) => {
        switch(partContent.type){
            case 'normal':
                return <div> {partContent.name} | {partContent.description} | {partContent.type} | {partContent.exerciseCount}</div>
            case 'groupProject':
                return <div> {partContent.name} | {partContent.groupProjectCount} | {partContent.type} | {partContent.exerciseCount}</div>
            case 'submission':
                return <div> {partContent.name} | {partContent.exerciseSubmissionLink} | {partContent.type} | {partContent.exerciseCount}</div>
            case 'special':
                return <div> {partContent.name} | {partContent.requirements} | {partContent.type} | {partContent.exerciseCount}</div>
            default:
                assertNever(partContent)
        }
    }


    return (
        <div>
            {renderPart(partContent)}
        </div>
    )
}

export default Part

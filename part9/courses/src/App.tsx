import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { CoursePart } from './models/CoursePart';


const App = () => {

  const courseName = "Half Stack application development";
// new types


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

  return (
    <div>
      <Header heading={courseName} />

      <Content content={courseParts} />

      <Total content={courseParts} />
    </div>
  );
};

export default App;
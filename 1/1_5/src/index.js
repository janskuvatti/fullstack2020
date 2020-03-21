import React from 'react';
import ReactDOM from 'react-dom';
const Header = (props) => {
return(
  <div>        
      <h1> {props.course.name}</h1>
 </div>
 )
}
const Part = (props) => {
    return(
        <div>
        {props.name }  {props.exercises}
        </div>
        )
}
const Content = ({parts}) =>{

  

 
   const data=  parts.map((course) =>
    <Part
      name={course.name}
      exercises={course.exercises}
       />
  );
  return (
    <p>
      {data}
    </p>
  );
    
}
const Total =({exercises}) => {

const sum = (a, b, c) => {
return a + b + c
}
const answer = sum(exercises[0].exercises, exercises[1].exercises, exercises[2].exercises)
 return(
         <div>
         <p>Number of exercises  {answer}
  </p>
         </div>
    );
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
    
  
  
  
    return (
      <div>
<Header course={course}/>
      <Content parts={course.parts} />
   

<Total exercises={course.parts}/>
      </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));


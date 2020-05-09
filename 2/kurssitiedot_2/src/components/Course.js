import React from 'react';

const Header = (props) => {
    //  console.log('headeri toimii...')
  
  return(
    <div>        
        <h1> {props.course}</h1>
  </div>
   )
  }
  const Part = (props) => {
    return(
      <div>
  <p>{props.part} {props.exercises}</p>
      </div>
    )
  }
  const Content = (props) => {
  
    return(
    <div>
  
     {props.course.map((course, x)=> 
  <Part key={x} part={course.name} exercises={course.exercises}/>  
     
    )} 
    
  
   
  
  </div>
    )
  }
  const Total = (props) => {
    const total = props.course.reduce(
      (all, course)=> all + course.exercises, 
      0);
      console.log(total)
      return(
        <div>
        <strong>Total of {total} exercises</strong> 
        </div>
      )
  }
  const Course = (props) => {
    return(
      <div>
  <Header course= {props.course.name} />
  <Content course ={props.course.parts}/>
  <Total course={props.course.parts}/>
      </div>
    )
  }
  export default Course;
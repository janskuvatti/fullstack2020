import React from 'react'

//notification
const Notification = ({ message, type}) => {
    const style ={
      background: 'bisque',
      color: type ==='success' ? 'green' : 'red',  
  
    fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={style}>    <p> {message}</p>
      </div>
      
    )
  }

export default Notification

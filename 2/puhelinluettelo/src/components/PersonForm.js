import React from 'react'

//PersonForm
const PersonForm = (props)=>{
    return(
      <div>
        <form onSubmit={props.addNewName}>
          <div>
            name: <input  value={props.newName} onChange={props.handleNameChange}/>
  
          </div>
          <div>number: <input value={props.puh} onChange={ props.handlePhoneChange} /></div>
  
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default PersonForm

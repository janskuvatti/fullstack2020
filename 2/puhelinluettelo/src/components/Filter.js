import React from 'react'

//Filter
const Filter = (props) => {
    return(
      <div> 
              Filter shown with: <input  value={props.filter} onChange={props.filterNames} />
  
      </div>
    )
  }

export default Filter

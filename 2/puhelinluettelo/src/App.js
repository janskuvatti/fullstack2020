import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone:'123-4567890' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ puh, setNewPuh ] = useState('')

const handlePhoneChange = (e) => {
e.preventDefault();
setNewPuh(e.target.value)
}
const handleNameChange = (e) => {
  e.preventDefault();
  setNewName(e.target.value)
}
const addNewName = (e) => {
  e.preventDefault();


   if(persons.find((n) => n.name === newName)){
    alert(`${newName} is already added to phonebook`)
    }
 
      else {
        const nameObject = {
          name : newName,
          phone: puh
           }
         
         setPersons(persons.concat(nameObject))
         console.log(persons)
           setNewName('');
           setNewPuh('')
      }
    
   

 
    


}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input  value={newName} onChange={handleNameChange}/>

        </div>
        <div>number: <input  value={puh} onChange={handlePhoneChange} /></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {/* {allNames} */}
      { persons.map(p =>
   <li key={p.name}>{p.name} {p.phone}</li> 
 )}
      </ul>
    </div>
  )

}

export default App
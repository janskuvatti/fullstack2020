import React, { useState } from 'react'
//Filter
const Filter = (props) => {
  return(
    <div> 
            Filter shown with: <input  value={props.filter} onChange={props.filterNames} />

    </div>
  )
}
//PersonForm
const PersonForm = (props)=>{
  return(
    <div>
      <form onSubmit={props.addNewName}>
        <div>
          name: <input  value={props.newName} onChange={props.handleNameChange}/>

        </div>
        <div>number: <input  value={props.puh} onChange={props.handlePhoneChange} /></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
//Persons
const Persons = (props) => {
  return(
    <ul>
    {/* {allNames} */}

  {props.searches.map(p =>
<li key={p.name}>{p.name} {p.number}</li> 
)}

  </ul>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [searches, setSearches] = useState(persons)
  const [ newName, setNewName ] = useState('');
  const [ puh, setNewPuh ] = useState('');
  const [filter, setFilter] = useState('');
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
          number: puh
           }
         
         setPersons(persons.concat(nameObject))
         //console.log(persons)
           setNewName('');
           setNewPuh('')
      }
  setSearches(persons)
    
}
const filterNames = (e) => {
  
  e.preventDefault();

  setFilter(e.target.value)
  console.log(filter);
  if(e.target.value){
  const result =persons.filter(t=>t.name.toLowerCase().includes( filter.toLowerCase()));
  setSearches(result)
  }
  else{
    setSearches(persons);
  }
 console.log(searches)
 //setPersons(searches);
}
  return (
    <div>
      <h2>Phonebook</h2>
      {/* <form onSubmit={filterNames}> */}
      <Filter searches={searches} persons={persons} filterNames ={filterNames} />
{/* </form> */}
<PersonForm persons = {persons} addNewName={addNewName} newName ={newName} handleNameChange ={handleNameChange} puh={puh} handlePhoneChange={handlePhoneChange}/>
      
      <h2>Numbers</h2>
      <Persons searches={searches} />
   
    </div>
  )

}

export default App
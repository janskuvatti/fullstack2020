import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import phoneService from './services/service'
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
        <div>number: <input value={props.puh} onChange={ props.handlePhoneChange} /></div>

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
    <div >
    
{props.all()}
  </div>
  )
}
const App = () => {
  const [ persons, setPersons] = useState([
   

  ]) 
  const [searches, setSearches] = useState([])

  const [ newName, setNewName ] = useState('');
  const [ puh, setNewPuh ] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
   phoneService
    .fetchAll()
    .then(all=> {
    
      setPersons(all)
      setSearches(all)
    })
  }, [])
  const data = () => {
    
    return searches.map(p =>
    <div key={p.id}>
<p key={p.name}>{p.name} {p.number} </p> <button onClick={() => poista(p.id, p.name)}>Delete</button>
</div>
    )
  }
const poista = ( id) => {
  const find= persons.find(x => x.id === id)
if(window.confirm(`Are you sure you want to delete ${find.name}?`)){
  phoneService
  .rem(id) 
 .then(
   phoneService.fetchAll().then(all=> {
   
     setPersons(all)
     setSearches(all)
     alert(`${find.name} is succesfully deleted`)
     data();

   })
 )
  
}

}
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
  const nameObject = {
    name : newName,
    number: puh
     }
const upd = persons.find((p )=> p.name === nameObject.name)

   if(persons.find((n) => n.name === nameObject.name)){
     const id = upd.id;
    if(window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with
    a new one?`)){
phoneService.edit(id, nameObject).then(x => {
  alert(`person ${newName} was succesfully updated`)
  setNewName('');
            setNewPuh('')
})
.catch (e => alert(`${nameObject.name} was already removed`))
setPersons(persons.filter (p => p.id !== id));
setSearches(persons)


    }
    

     
   }
     
   else {
      
         
           
    //TODO: Post a new pewson to db
   phoneService
   .create(nameObject) 
    .then((r) => {
     setPersons(persons.concat(nameObject))
     alert(`${nameObject.name} succesfully added`)
     setNewName('');
     setNewPuh('')

      console.log(persons)
      //setSearches(persons)
     // data();

    })
     //setNewName({name: '', number: ''});

}
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
}
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searches={searches} persons={persons} filterNames ={filterNames} key={searches.name}/>
      <PersonForm persons = {persons} addNewName={addNewName} newName ={newName} handleNameChange ={handleNameChange} puh={puh} handlePhoneChange={handlePhoneChange}/>
      
      <h2>Numbers</h2>
      <Persons key={persons.name} all={data} />
    </div>
  )

}

export default App
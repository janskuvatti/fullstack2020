import React, { useState, useEffect } from 'react'
import phoneService from './services/service'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([ ]) 
  const [searches, setSearches] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ puh, setNewPuh ] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('')
  const [filter, setFilter] = useState('');
  useEffect(() => {
   phoneService
    .fetchAll()
    .then(all=> {
      setPersons(all)
      setSearches(all)
      setMessage(null)
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
     data();
  setType('success'); 
  setMessage(
 `Person ${find.name} successfully deleted`
  )
   setTimeout(() => {
      setMessage(null)
     }, 5000)
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
  if(window.confirm(`${nameObject.name} is already added to phonebook, replace the old number witha new one?`)){
  phoneService.edit(id, nameObject).then(x => {
  setType('success');
  setMessage(
    `Person ${nameObject.name} successfully updated`
  )
  setNewName('');
  setNewPuh('')
  setTimeout(() => {
    setMessage(null)
  }, 5000)
})

.catch (e => {
  setType('error');
  setMessage(
    `Person ${nameObject.name} is already removed`
  )
   setTimeout(() => {
    setMessage(null)
}, 5000)
})
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
     
      console.log(persons)
      setType('success');

     setMessage(
      `Person ${nameObject.name} successfully added`
    )
    console.log(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    
    setNewName('');
    setNewPuh('')

    })

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
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searches={searches} persons={persons} filterNames ={filterNames} key={searches.name}/>
      <h1>Add a new number</h1>
      <PersonForm persons = {persons} addNewName={addNewName} newName ={newName} handleNameChange ={handleNameChange} puh={puh} handlePhoneChange={handlePhoneChange}/>
      <Notification message={message} type={type}/>
      <h2>Numbers</h2>
      <Persons key={persons.name} all={data} />
    </div>
  )

}

export default App
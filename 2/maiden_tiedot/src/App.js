import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [search, setSearch] = useState('');
  const[results, setResults] = useState([]);
  const [filtered, setFiltered]= useState([])
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)
  }
const fetchCountries = (e)  => {
  e.preventDefault();
  axios.get('https://restcountries.eu/rest/v2/all')
  .then (res => {
    // setResults(res.data)
    const filter =res.data.filter(t=>t.name.toLowerCase().includes( search.toLowerCase()));
console.log(filter)
setFiltered(filter)
setResults(filtered)
  })
}

const showData = () => {
 

  if(results.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
 else if(results.length > 1 && results.length < 10){
  
   console.log(results.name)
   return(
    results.map(p =>
<p key={p.name}>{p.name}</p> 
  )
  )
   
  }
 
  else if (results.length === 1){
    return(
      results.map(p =>
        <div key={p.name}>
        <h1 >{p.name}</h1> 
        <p>Capital: {p.capital}</p>
        <p>Population: {p.population}</p>
        <h2>Languages</h2>
<ul>
  {p.languages.map(l => (
    <li key={l.name}>{l.name}</li>
  )
    
    )}
</ul>
 <img src={p.flag} alt='flag' style={{'width': 250, 'height': 250}} />       
        </div>
          )
    )
  }
}


  return (
    <div className="App">
      <form onSubmit = {fetchCountries}>
   find countries: <input  value={search} onChange={handleChange}/>
</form>
{showData()}
    </div>
  );

}
export default App;

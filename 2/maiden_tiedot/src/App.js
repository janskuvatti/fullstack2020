import React, {useState} from 'react';
import './App.css';
import {key} from './key'
import axios from 'axios';

const ShowWeather = (props) => {
  const [temp, setTemp] = React.useState('');
  const [windSpeed, setWindspeed] = React.useState('');
  const [img, setImg] = React.useState('');
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&units=metric&APPID=${key}`)
  .then (response => response.json())
 
 .then (responseData => {
    //  console.log(responseData.name);
    //  console.log(responseData.wind.speed );
    //  console.log(responseData.main.temp);
     setTemp(responseData.main.temp);
     setWindspeed(responseData.wind.speed );
setImg( 'http://openweathermap.org/img/w/' + responseData.weather[0].icon + '.png');





 
  })
  .catch(err  => console.error(err))
  return(
    <div> 
      <h1>Weather in {props.capital}</h1>
       <p><b>Temperature: </b> {temp} Celsius</p>
       <img src={img} alt="Weather" />
      <p> <b>Wind: </b>{windSpeed} mph</p>
    </div>
  
  )
}
function App() {
  const [search, setSearch] = useState('');
  const[results, setResults] = useState([]);
  

  const [filtered, setFiltered]= useState([])
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    //console.log(search)
  }
const fetchCountries = (e)  => {
  e.preventDefault();
  axios.get('https://restcountries.eu/rest/v2/all')
  .then (res => {
    const filter =res.data.filter(t=>t.name.toLowerCase().includes( search.toLowerCase()));
//console.log(filter)
setFiltered(filter)
setResults(filtered)
  })
}

const showData = () => {
 

  if(results.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
 else if(results.length > 1 && results.length < 10){

   return(
    results.map(p =>
    <ul key={p.name}>
<li >{p.name} <button onClick={() => showCountryDetails(p.name)}>Show info</button></li>
</ul>
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
 <ShowWeather capital={p.capital} />

        </div>
      )
    )
  }
}

const showCountryDetails = (name)=> {
//console.log(name)

axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
.then (res => {
  setResults(res.data)
//console.log(res)
})

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
 <ShowWeather capital={p.capital} />

        </div>
  )
  )
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

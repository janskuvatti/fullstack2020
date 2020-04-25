import React, {useState} from 'react';
import ReactDOM from 'react-dom';
//Button-komponentti - palautenappulat
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
//Renderöi palauterivit
const Line=({txt, val})=> {
  return(
    
    <>
  <tr><td>{txt}</td><td>{val}</td></tr>
  </>
  
  )
}
//Tilastokomponentti
const Statistics = ({positive, negative, neutral, Total, Avg, CountPositive}) => {
  if(Total() === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given...</p>
      </div>
    )
  }
  return(
<div>
<h1>Statistics</h1>
<table>
  <tbody>
<Line txt="Good" val={positive}/>
<Line txt="Neutral" val={neutral}/>
<Line txt="Bad" val={negative}/>
<Line txt="All" val={Total()}/>
<Line txt="Average" val={Avg()}/>
<Line txt="Positive(%)" val={CountPositive()}/>
</tbody>
</table>
    
       
   
</div>
  )
  }

const App = props => {
 
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [neutral, setNeutral] = useState(0);

  

//Laskee palautteiden määrän  
  const Total = () => {
    return positive + negative + neutral
  }
  //Laskee keskiarvon
  const Avg = () =>{
  
  return (positive - negative) / Total()
  }
  //Lasakee positiivisten palautteiden osuuden palautteesta
  const CountPositive = () => {
    
    return (positive / Total()) * 100
  }
    return (
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={() => setPositive(positive +1)} text="Good"/>
        <Button handleClick ={() => setNeutral(neutral +1)} text="Neutral"/>
        <Button handleClick ={() => setNegative(negative +1)}text="Bad"/>
<Statistics
positive={positive}
negative={negative}
neutral={neutral}
Total ={Total}
Avg={Avg}
CountPositive={CountPositive}
/>
        
      </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));


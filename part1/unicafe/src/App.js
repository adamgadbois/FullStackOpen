import { useState } from '../../../1.12-1.14/node_modules/@types/react'

const Button = ({handleClick,buttonText}) => (
  <button onClick={handleClick}>
    {buttonText}
  </button>
)

const StatisticLine = ({text,value}) => (
  <table>
      <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
)

const Statistics = ({good,neutral,bad}) => {
  const totalReviews = () => (good+neutral+bad)
  const average = () => ((good-bad)/totalReviews())
  const percentPositive = () => (good/totalReviews()*100)
  if(totalReviews() === 0){
    return(
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={totalReviews()}/>
      <StatisticLine text="Average" value={average()}/>
      <StatisticLine text="Positive" value={percentPositive()+"%"}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = (newValue) => {
    setGood(newValue)
  }

  const incrementNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const incrementBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>incrementGood(good+1)} buttonText="good"/>
      <Button handleClick={()=>incrementNeutral(neutral+1)} buttonText="neutral"/>
      <Button handleClick={()=>incrementBad(bad+1)} buttonText="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
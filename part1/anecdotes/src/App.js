import { useState } from 'react'


const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Votes = ({total}) => (
  <p>Has {total} votes</p>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomNumber = (min,max)=> {
    console.log("min"+min)
    console.log("max"+max)
    console.log(Math.floor(Math.random() * (max-min) + min))
    return Math.floor(Math.random() * (max-min) + min)
  }
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))

  const setAnecdote = (newValue) => {
    setSelected(newValue)
  }

  const addVote = (newValue) => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const getMostVotes = () => {
    let mostVotes = 0
    let arrIndex = 0
    votes.forEach((element,index) => {
      if (element > mostVotes) {
        mostVotes = element
        arrIndex = index
      }
    })
    return(arrIndex)
  }

  console.log(selected)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Votes total={votes[selected]}/>
      <Button handleClick={()=>addVote(selected)} text="Vote"/>
      <Button handleClick={()=>setAnecdote(randomNumber(0,anecdotes.length-1))} text="Next Anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[getMostVotes()]}</p>
    </div>
  )
}

export default App
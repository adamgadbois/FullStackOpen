import { useEffect, useState } from 'react'
import axios from 'axios'

const Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Filter = ({search,handleSearchChange}) => {
  return(
    <div>
      <h2>Search</h2>
      <input
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.some(person => person.name.toUpperCase() === newName.toUpperCase())
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filterPersons = () => persons.filter(person => RegExp(search,"i").test(person.name))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search = {search} handleSearchChange = {handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson = {addPerson} 
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filterPersons()} />
    </div>
  )
}

export default App
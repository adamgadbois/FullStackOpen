import { useEffect, useState } from 'react'
import numbersService from './services/numbers'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    numbersService.getAll().then(returnedNumbers => setPersons(returnedNumbers))
  }, [])

  const deletePerson = (id) => {
    numbersService.remove(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  const addPerson = (event) => {
    event.preventDefault()

    const index = persons.findIndex(person => RegExp(newName,"i").test(person.name))
    if(index > -1){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const arrayCopy = persons
        arrayCopy[index].number = newNumber
        setPersons(arrayCopy)

        const person = arrayCopy[index]
        numbersService.update(person.id,person)
      }
    } else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      numbersService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
        })
        .catch(error => {
          console.log('person not created')
        })
    }
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
      <Persons persons={filterPersons()} deletePerson={deletePerson} />
    </div>
  )
}

export default App
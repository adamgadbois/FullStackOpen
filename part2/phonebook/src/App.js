import { useEffect, useState } from 'react'
import numbersService from './services/numbers'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({error:false,message:''})

  useEffect(() => {
    numbersService.getAll().then(returnedNumbers => setPersons(returnedNumbers))
  }, [])

  const deletePerson = (person) => {
    numbersService
      .remove(person.id)
      .catch(error =>{
        setNotification({error:true,message:`Information of ${person.name} has already been removed from server`})
      })
    setPersons(persons.filter(p => p.id !== person.id))
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())
    if(person){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        numbersService
          .update(person.id,{...person,number:newNumber})
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response))
            setNotification({error:false,message:`Edited ${newName}`})
          })
          .catch(error => {
            setNotification({error:true,message:`Could not edit ${newName}`})
          })
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
          setNotification({error:false,message:`Added ${newName}`})
        })
        .catch(error => {
          setNotification({error:true,message:`Could not add ${newName}`})
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

  const filterPersons = () => persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
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
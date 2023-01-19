import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/Adps"

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterQuery, setFilterQuery] = useState('')

  const hook = () => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService.create(newPerson).then(
        returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        }
      )
    }
  }

  const removePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)){
      personService.remove(id).then( () => {
        setPersons(persons.filter(person => person.name !== name))
      })
    }
  }

  const handleChange = setValue => event => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={filterQuery} change={handleChange(setFilterQuery)} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        changeName={handleChange(setNewName)}
        changeNumber={handleChange(setNewNumber)}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        query={filterQuery}
        removePerson={removePerson}
      />
      debug_name: {newName}
      <br />
      debug_number: {newNumber}
      <br />
      debug_search: {filterQuery}
    </div>
  )
}

export default App;
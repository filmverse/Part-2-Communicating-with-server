import { useState, useEffect } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterQuery, setFilterQuery] = useState('')

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response)
      setPersons(response.data)
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
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleChange = setValue => event => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter query={filterQuery} change={handleChange(setFilterQuery)} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} changeName={handleChange(setNewName)} changeNumber={handleChange(setNewNumber)} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} query={filterQuery} />
      debug_name: {newName}
      <br />
      debug_number: {newNumber}
    </div>
  )
}

export default App;
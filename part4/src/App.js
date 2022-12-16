
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filterQuery, setFilterQuery ] = useState('')

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
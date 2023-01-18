import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newPerson, setNewPerson ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ queryFilter, setQueryFilter ] = useState('')

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        setPersons(response.data)
        console.log(response.data)
      }
    )
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newPerson)) {
      alert(`${newPerson} is already added to phonebook`)
    } else {
      const newContact = {
        name: newPerson,
        number: newNumber
      }
      axios.post('http://localhost:3001/persons', newContact).then(
        response => {
          setPersons(persons.concat(response.data))
          setNewPerson('')
          setNewNumber('')
        }
      )
    }
  }

  const handleChange = (setValue) => (event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={queryFilter} onChange={handleChange(setQueryFilter)} /></p>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        name: <input value={newPerson} onChange={handleChange(setNewPerson)} /><br />
        number: <input value={newNumber} onChange={handleChange(setNewNumber)} /><br />
        <button type="submit">add</button>
      </form>
      <h3>Numbers</h3>
      {persons.filter(person => person.name.toLocaleLowerCase().includes(queryFilter)).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      <p>debug name: {newPerson}</p>
      <p>debug number: {newNumber}</p>
      <p>debug filter: {queryFilter}</p>
    </div>
  )
}

export default App;
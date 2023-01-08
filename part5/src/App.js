import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteServise from "./services/notes"

const App = () => {

  const [notes, setNotes] = useState([])

  const [newNote, setNewNote] = useState('')

  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    noteServise.getAll().then(initialNotes => {
      console.log('promise fulfilled')
      setNotes(initialNotes)
    })
  }

  useEffect(hook, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteServise.create(noteObject).then(
      returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      }
    )
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be togged`)
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important }
    noteServise.update(id, changeNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          note => <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
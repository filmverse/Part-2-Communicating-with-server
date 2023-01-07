
const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'name not important' : 'make important'

    return (
        <div>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </div>
    )
}

export default Note;

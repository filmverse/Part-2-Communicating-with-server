
const Persons = ({ persons, query, removePerson }) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLocaleLowerCase().includes(query))
                .map(person => <p key={person.name}>{person.name} {person.number} <button onClick={removePerson(person.id, person.name)}>delete</button></p>)}
        </div>
    )
}

export default Persons;
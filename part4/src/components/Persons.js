
const Persons = ({ persons, query }) => {
    return (
        <div>
            {persons
                .filter(person => person.name.toLocaleLowerCase().includes(query))
                .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;
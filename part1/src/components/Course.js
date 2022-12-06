const Part = ({ part }) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Header = ({ heading }) => {
    return (
        <div>
            <h1>{heading}</h1>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            <h3>{parts.map(part => (<Part key={part.id} part={part} />))}</h3>
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((a, b) => a + b.exercises, 0)
    return (
        <div>
            <p key={total.id}>
                <strong>{total}</strong>
            </p>
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <div key={course.id}>
                    <Header heading={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            ))}
        </div>
    )
}

export default Courses;

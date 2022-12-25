
const Filter = ({ query, change }) => {
    return (
        <div>
            <p>
                filter shown with <input value={query} onChange={change} />
            </p>
        </div>
    )
}

export default Filter;

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')

  const dev = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setCountries(response.data.map(cname => ({
        name: cname.name.common,
        capital: cname.capital,
        area: cname.area,
        language: cname.languages,
        flag: cname.flag,
      })))
    })
  }

  useEffect(dev, [])

  console.log(countries)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h1>find countries <input value={query} onChange={handleChange} /></h1>
      {countries.map((country) => <h1 key={country.name}>name:{country.name}<br />capital:{country.capital}<br />flag:{country.flag}</h1>)}
    </div>
  )
}

export default App;
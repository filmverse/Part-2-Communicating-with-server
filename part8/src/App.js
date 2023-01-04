
import { useState, useEffect } from "react";
import axios from "axios";
import CountriesDetails from "./components/CountriesDetails";

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ showCountry, setShowCountry ] = useState({})

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const hookApi = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data.map(cname => ({
        name: cname.name.common,
        capital: cname.capital,
        area: cname.area,
        language: cname.languages,
        flag: cname.flag,
        flags: cname.flags,
      })))
    })
  }

  useEffect(hookApi, [])

  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(query)
  )

  const handleShowCountry = (event) => () => setShowCountry(filteredCountries.filter(count => count.name.includes(event))[0])

  console.log(showCountry)

  return (
    <div>
      <p>Search <input value={query} onChange={handleSearch} /></p>
      <h3>Search Countries</h3>
      {filteredCountries.length > 10 && (
        <h3>Too many matches, specify another filter</h3>
      )}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map(
        country => (
          <p key={country.name}>
            Country: {country.name}<br />
            Capital: {country.capital}<br />
            Area: {country.area}<br />
            Flag: {country.flag}
            <button onClick={handleShowCountry(country.name)}>show</button>
          </p>
        )
      )}
      {filteredCountries.length === 1 && (
        <CountriesDetails viewCountry={filteredCountries[0]} />
      )}
      {showCountry.name && (
        <CountriesDetails viewCountry={showCountry} />
      )}

      <h3>All Countries</h3>
      {countries.map(country => (
        <p key={country.name}>
          Country: {country.name}<br />
          Capital: {country.capital}<br />
          Area: {country.area}<br />
          Flag: {country.flag}
        </p>
      ))}
    </div>
  )
}

export default App;
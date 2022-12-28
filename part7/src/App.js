
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [countries, setCountries] = useState([])

  const dev = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
      setCountries(response.data.map(cname => ({
        name: cname.name.common,
        capital: cname.capital
      })))
    })
  }

  useEffect(dev, [])

  console.log(countries)

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}

export default App;

import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default App;

import { useState } from "react";
import axios from "axios";
import kelvinToCelsius from "../utils/kelvinToCelsius";

const CountriesDetails = ({ viewCountry }) => {

    const [temperature, setTemperature] = useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState('')

    axios.get(`
        https://api.openweathermap.org/data/2.5/weather?q=${viewCountry.capital[0]}&appid=${process.env.REACT_APP_API_KEY}
    `).then(response => {
        console.log(response.data)
        setTemperature(Math.round(kelvinToCelsius(response.data.main.temp) * 10) / 10)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
    })

    return (
        <div>
            <h1>Country: {viewCountry.name}</h1>
            <h2>Capital: {viewCountry.capital}</h2>
            <h2>Area: {viewCountry.area}</h2>
            <h2>Languages:</h2>
            <ol>{Object.values(viewCountry.language).map(lang => <li key={lang}>{lang}</li>)}</ol>
            <img src={viewCountry.flags.png} alt={`${viewCountry.name} flag`} />
            <h2>Weather in {viewCountry.capital[0]}</h2>
            <div>temperature {temperature} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <div>wind {wind} m/s</div>
        </div>
    )
}

export default CountriesDetails;
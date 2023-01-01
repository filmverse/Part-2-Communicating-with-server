
import axios from "axios";
const CountryDetails = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <h2>{country.capital}</h2>
            <h2>{country.area}</h2>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.language).map(
                    language => <li key={language}>{language}</li>
                )}
            </ul>
            <div>
                <img src={country.flags.png} alt={`${country.name} flag`} />
            </div>
        </div>
    )
}

export default CountryDetails;
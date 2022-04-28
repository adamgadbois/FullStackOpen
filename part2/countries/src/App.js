import {useEffect, useState} from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Filter = ({filter,handleFilterChange}) => {
  return(
    <div>
      <p>find countries: 
      <input
        value={filter}
        onChange={handleFilterChange}
      /></p>
    </div>
  )
}

const Countries = ({countries,setCountries}) => {
  if (countries.length > 10){
    return(<p>Too many matches, specify another filter</p>)
  }
  else if (countries.length === 1){
    const name = countries[0].name.common
    const capital = countries[0].capital
    const area = countries[0].area
    const languages = countries[0].languages
    const flag = countries[0].flags.png

    const altText = `Flag of ${countries[0].name.common}`
    return(
      <div>
        <h1>{name.common}</h1>
          <p>capital {capital}</p>
          <p>area {area}</p>
        <h2>languages</h2>
          <ul>
            {Object.values(languages).map((language,index) => <li key={index}>{language}</li>)}
          </ul>
        <img src={flag} alt={altText}/>
        <h2>Weather in {capital}</h2>
        <Weather city={capital}/>
      </div>
    )
  }
  else{
    return(
      <div>
        {countries.map(country => <Country key = {country.cca3} country = {country} setCountries = {setCountries}/>)}
      </div>
    )
  }
}

const Country = ({country,setCountries}) => {
  const handleClick = (event) => {
    setCountries([country])
  }
  return(<p>{country.name.common} <button type="button" onClick={handleClick}>Show</button></p>)
}

const Weather = ({city}) => {
  const [weather,setWeather] = useState(false)
  useEffect(() =>{
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`)
      .then(response =>{
        setWeather(response.data)
      })
    //eslint-disable-next-line
  },[])
  if (weather !== false) {
    const temp = weather.current.temp_f
    const forecast = weather.current.condition.text
    const wind = weather.current.wind_mph
    return(
      <div>
        <p>{temp} Fahrenheit</p>
        <p>{forecast}</p>
        <p>{wind} mph</p>
      </div>
    )
  }
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    filterCountries()
  }

  const filterCountries = () => {
    setCountries(allCountries.filter(country => RegExp(filter,"i").test(country.name.common)))
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setAllCountries(response.data)
      })
  },[])

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} setCountries={setCountries}/>
    </div>
  )
}

export default App;

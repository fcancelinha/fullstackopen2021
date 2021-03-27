import React, {useState,useEffect} from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'

const Weather = ({countryName}) => {
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {

        const apiKey = process.env.REACT_APP_API_KEY

        axios
        .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryName}&units=m`)
        .then(response => {
          console.log("weather", response)
          setWeather(response.data)
          setLoading(false)
    
        }).catch(error => console.log("error", error))

      }, [countryName])

    return loading ? null :  <WeatherInfo weather={weather} />
}


export default Weather

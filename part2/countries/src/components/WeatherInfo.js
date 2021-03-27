import React from 'react'

const WeatherInfo = ({weather}) => {
    return (
         <div>
            <h3>Weather in {weather.location.name } </h3>

            <div>
                <p><b>temperature:</b> {weather.current.temperature} Celsius </p>
                <p><b>wind:</b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir} </p>

                <div>
                    <img width="75px" src={weather.current.weather_icons[0]} alt={"weather icon"}></img>
                </div>
            </div>
        </div>
    )
}

export default WeatherInfo

import React from 'react'
import Weather from './Weather'

const CountryInfo = ({info}) => {

    if(info.name === undefined) 
        return "";

    const {name, capital, population, languages, flag} = info
   
    return (
        <div>
            <h3> {name} </h3>

            <div> capital {capital} </div>
            <div> population {new Intl.NumberFormat('de-DE').format(population)} </div>
            
            <h4>languages</h4>

            <ul>
                {languages.map(({name, iso639_1}) =>  <li key={iso639_1}> {name} </li>)}
            </ul>
           
            <img src={flag} width="100px" alt="info flag"></img>


            <div>
                <Weather countryName={name} />
            </div>

        </div>
    )
}

export default CountryInfo

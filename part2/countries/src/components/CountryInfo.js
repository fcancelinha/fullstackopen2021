import React from 'react'

const infoInfo = ({info}) => {

    console.log("info", info[0])
    const {name, capital, population, languages, flag} = info[0]

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

        </div>
    )
}

export default infoInfo

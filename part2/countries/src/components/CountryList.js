import React, { useState } from 'react'
import CountryInfo from './CountryInfo'
import Button from './Button'

const CountryList = ({ filtered }) => {
  const [country, setCountry] = useState({})

  if (!filtered.length)
    return <li>No matching results!</li>

  if (filtered.length > 10)
    return <li>Too many specific matches, specify another filter</li>

  const handler = (ct) => {
    console.log("ct", ct)
    setCountry(ct)
  }

  return (
    <div>

      <ul hidden={filtered.length === 1}>
        {filtered.map(x => (
          <li key={x.name}> 
            {x.name} <Button handler={() => handler(x)} text={"show"} />
          </li>
        ))}
      </ul>

      <div>
        <CountryInfo info={filtered.length === 1 ? filtered[0] : country } />
      </div>

    </div>
  )

}

export default CountryList

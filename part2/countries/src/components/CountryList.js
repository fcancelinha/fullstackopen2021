import React, {useState, useEffect} from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'
import axios from 'axios'

const CountryList = ({search}) => {
    const [list, setList] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log("data", response)
      setList(response.data)
    })
  }, [])

  const filteredList = (search) => {
    const filtered = list.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))
    
    if(!filtered.length)
      return <li>No matching results!</li>
    
    const elements = filtered.length > 10 
              ? <li>Too many specific matches, specify another filter </li> 
              : filtered.map(({numericCode, name}) => <Country key={numericCode} content={name} />) 
      
    return filtered.length === 1 ?  <CountryInfo info={filtered} />  : elements 
  }

    return filteredList(search)

}

export default CountryList

import React from 'react'
import CountryList from './CountryList'


const CountryViewer = ({search, list}) => {

    let filteredList = list.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()))

    return <CountryList filtered={filteredList} />        
}

export default CountryViewer

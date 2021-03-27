import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Searchbar from './components/Searchbar'
import CountryViewer from './components/CountryViewer'
import axios from 'axios'



const App = () => {
    const [search, setSearch] = useState('')    
    const [list, setList] = useState([])

    useEffect(() => {
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("data", response)
        setList(response.data)
      })
      .catch(error => console.log("error", error))
    }, [])
    
   
  return(

    <div>
      <Searchbar filter={search} handler={(event) => setSearch(event.target.value)} />

      <CountryViewer search={search} list={list} />
      
    </div>
  )

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


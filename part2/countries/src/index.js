import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Searchbar from './components/Searchbar'
import CountryList from './components/CountryList'


const App = () => {
    const [search, setSearch] = useState('')

  return(

    <div>
      <Searchbar filter={search} handler={(event) => setSearch(event.target.value)} />

      <div>
        <CountryList search={search} />
      </div>



    </div>

  )



}




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


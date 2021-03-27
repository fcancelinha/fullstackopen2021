import React from 'react';

const Searchbar = ({value, handler}) => {

    return (
        <div>find countries <input value={value} onChange={handler}></input> </div>
    )
}

export default Searchbar


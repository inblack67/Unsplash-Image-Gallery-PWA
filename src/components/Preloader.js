import React from 'react'
import './Preloader.css';

const Preloader = () => {
    return (
      <div className="container center" style={{'marginTop': '5rem'}}>
              <div className="loader">
      <span></span>
      <span></span>
      <span></span>
      </div>
      </div>
    )
}

export default Preloader

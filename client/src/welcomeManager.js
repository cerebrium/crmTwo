import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const WelcomeManager = (props) => {
    const [ currDate, setCurrDate] = useState(new Date())

    var myCurrDate;
    if (currDate) {
        myCurrDate = currDate.toDateString()
    } else {
        myCurrDate = ''
    }

   return (
       <>  
            <nav className='navBar'>
                <div>
                    <Link to='/' className='bottomLinks'>Back to Welcome</Link>
                </div>
                <div>
                    <Link to='/exeter' className='bottomLinks'>Exeter Dashboard</Link>
                </div>
                <div>
                    <Link to='/newdrivers' className='bottomLinks'>New Drivers</Link>
                </div>
                <div>
                    <Link to='/bristol' className='bottomLinks'>Bristol Dashboard</Link>
                </div>
                <div>
                    <Link to='/swindon' className='bottomLinks'>Swindon Dashboard</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1 className='centerThis'>Welcome {props.user.name}</h1>
                <h3 className='centerThis'>{myCurrDate}</h3>
            </div>
       </>
   )
}

export default WelcomeManager
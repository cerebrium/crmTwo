import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import Billpay from './Billpay'
import axios from 'axios'
import './App.css'

const WelcomeManager = () => {
    const [ drivers, setDrivers] = useState([])

    useEffect(() => {
        axios.get('/auth/alldrivers').then( response => {
            console.log(response.data)
            setDrivers(response.data)
        })
    }, [])

    var myDrivers; 
    if (drivers) {
        myDrivers = drivers.map((ele, id) => <h3 key={id} ><Link to={`/billpay/initial/${ele._id}`} id={ele._id}>{ele.name}</Link></h3>)
    } else {
        myDrivers = ''
    }

    return (
        <div className='mainAppTwo'>
            <h1 className='welcomeManager'>WelcomeManager</h1>
            <h3>Select a Driver</h3>
            {myDrivers}
        </div>
    )
}

export default WelcomeManager
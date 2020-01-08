import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const WelcomeManager = () => {
    const [ drivers, setDrivers] = useState([])
    const []

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

    let searcher = (x, arr) => {
        let myReturnArray = []
        for (let i = 0; i < arr.length; i++) {
          let mySub = arr[i].substring(0, x.length)
          if (mySub === x) {
            myReturnArray.push(arr[i])
          }
        }
        return myReturnArray
      }
      
      searcher('c', myArray)

    return (
        <div className='mainAppTwo'>
            <h1 className='welcomeManager'>WelcomeManager</h1>
            <div className='myDataManagerPage'>
                <div className='allDataClass'>
                    <h3>View all data</h3>
                    <Link to='/allpayments'>All Payments</Link>
                </div>
                <hr />
                <div className='driversClass'>
                    <h3>Select a Driver</h3>
                    {myDrivers}
                </div>
            </div>
        </div>
    )
}

export default WelcomeManager
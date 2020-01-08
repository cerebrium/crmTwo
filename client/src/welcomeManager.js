import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

const WelcomeManager = () => {
    const [ drivers, setDrivers] = useState([])
    const [driverArray, setDriverArray] = useState([])

    useEffect(() => {
        axios.get('/auth/alldrivers').then( response => {
            setDrivers(response.data)
        })
    }, [])

    var myDrivers; 
    if (driverArray.length >= 1) {
        console.log('inside driverArray.length function', driverArray)
        myDrivers = driverArray.map((ele, id) => <h3 key={id} ><Link to={`/billpay/initial/${ele._id}`} id={ele._id} className='bottomLinks'>{ele.name}</Link></h3>)
    } else {
        myDrivers = ''
    }

    let onChange = (ev) => {
        let myNameArray = drivers.map((ele, index) => {
            return {
                name: ele.name,
                _id: ele._id
            } 
        })
        searcher(ev.target.value, myNameArray)
    }

    let onSubmit = (ev) => {
        ev.preventDefault()
    }

    let searcher = (x, arr) => {
        console.log(driverArray)
        let myReturnArray = []
        if (x) {
            for (let i = 0; i < arr.length; i++) {
              let mySub = arr[i].name.substring(0, x.length)
              if (mySub === x) {
                myReturnArray.push(arr[i])
              }
            }
        }
        setDriverArray(myReturnArray)
    }

    return (
        <>
            <nav className='navBar'>
                <div>
                    <Link to='/' className='bottomLinks'>Back to Welcome</Link>
                </div>
                <div>
                    <Link to='/allpayments' className='bottomLinks'>All Payments</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1 className='welcomeManager'>WelcomeManager</h1>
                <div className='myDataManagerPage'>
                    <div className='allDataClass'>
                        <h3>View all data</h3>
                    </div>
                    <hr />
                    <div className='driversClass'>
                        <form onSubmit={onSubmit}>
                            <label>Select a driver</label>
                            <input type="text" name='inputText' onChange={onChange}/>
                        </form>
                        {myDrivers}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomeManager
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Billpay = (props) => {

    const [ driver, setDriver] = useState(null)
    const [driverMiles, setDriverMiles] = useState(0)
    const [driverPay, setDriverPay] = useState(0)
    const [driverHours, setDriverHours] = useState(0)

    useEffect(() => {
        var myId = props.location.pathname.replace(/\/billpay\//, '')
        axios.get(`/billpay/${myId}`).then(res => {
            setDriver(res.data)
            console.log(res.data)
            setDriverHours(res.data.hoursWorked)
            setDriverPay(res.data.amountDue)
            setDriverMiles(res.data.milesDriven)
        })
    }, [])

    var driverDetails;
    if (driver) {
        driverDetails = (
            <>
                <h3>Name: {driver.name}</h3>
                <h3>Email: {driver.email}</h3>
                <h3>Current Miles: {driverMiles}</h3>
                <h3>Current Hours: {driverHours}</h3>
                <h3>Current Amount Due: {driverPay}</h3>
            </>
        )
    } else {
        driverDetails = ('')
    }

    var handleSubmit = (ev) => {
        ev.preventDefault()
        console.log(ev.target.milesDriven.value, ev.target.hoursWorked.value, ev.target.amountDue.value)
        var myIdTwo = props.location.pathname.replace(/\/billpay\/initial\//, '')
        setDriverHours(ev.target.hoursWorked.value)
        setDriverPay(ev.target.amountDue.value)
        setDriverMiles(ev.target.milesDriven.value)
        axios.post('/billpay/edit', {
            id: myIdTwo,
            milesDriven: ev.target.milesDriven.value,
            hoursWorked: ev.target.hoursWorked.value,
            amountDue: ev.target.amountDue.value
        }).then(response => {
            console.log(response.data)
        })
        ev.target.milesDriven.value = ''
        ev.target.hoursWorked.value = ''
        ev.target.amountDue.value = ''
    }

    return (
        <div className='mainAppTwo'>
            <h1>Billpay Page</h1>
            {driverDetails}
            <form onSubmit={handleSubmit}>
                <label>Miles Driven</label><br /> 
                <input type="number" name='milesDriven'/><br /> 
                <label>Hours Worked</label><br /> 
                <input type="number" name='hoursWorked'/><br /> 
                <label>Amount Due</label><br /> 
                <input type="number" name='amountDue'/><br /> 
                <input type="submit" value="submit"/><br /> 
            </form>
            <Link to='/' className='bottomLink'><button>Back to Welcome</button></Link>
        </div>
    )
}

export default Billpay
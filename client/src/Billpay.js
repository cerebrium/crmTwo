import React, { useState, useEffect, Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import './App.css'

const Billpay = (props) => {

    const [ driver, setDriver] = useState(null)
    const [driverMiles, setDriverMiles] = useState(0)
    const [driverPay, setDriverPay] = useState(0)
    const [driverHours, setDriverHours] = useState(0)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [viewDate, setViewDate] = useState('')

    useEffect(() => {
        var myId = props.location.pathname.replace(/\/billpay\//, '')
        axios.get(`/billpay/${myId}`).then(res => {
            setDriver(res.data)
            setDriverHours(res.data.hoursWorked)
            setDriverPay(res.data.amountDue)
            setDriverMiles(res.data.milesDriven)
            let currDate = dateSelected.toDateString()
            setViewDate(currDate)
        })
    }, [])

    var driverDetails;
    if (driver) {
        driverDetails = (
            <>
                <h3>Name: {driver.name}</h3>
                <h3>Email: {driver.email}</h3>
            </>
        )
    } else {
        driverDetails = ('')
    }

    var handleSubmit = (ev) => {
        ev.preventDefault()
        var myIdTwo = props.location.pathname.replace(/\/billpay\/initial\//, '')
        setDriverMiles(ev.target.milesDriven.value)
        axios.post('/billpay/edit', {
            id: myIdTwo,
            calDate: dateSelected,
            milesDriven: ev.target.milesDriven.value,
            firstDeliveryTime: ev.target.firstDeliveryTime.value,
            startMileage: ev.target.startMileage.value,
            lastDeliveryTime: ev.target.lastDeliveryTime.value,
            finishMileage: ev.target.finishMileage.value,
            routeNumber: ev.target.routeNumber.value,
            location: ev.target.location.value,
            numberOfParcelsDelivered: ev.target.numberOfParcelsDelivered.value,
            returnBackTime: ev.target.returnBackTime.value,
            numberOfParcelsBroughtBack: ev.target.NumberOfParcelsBroughtBack.value,
            ownerVehicleRegistration: ev.target.ownerVehicleRegistration.value, 
            amountDue: ev.target.amountDue.value
        }).then(response => {
            console.log(response.data)
        })
        ev.target.milesDriven.value = ''
        ev.target.firstDeliveryTime.value = ''
        ev.target.startMileage.value = ''
        ev.target.lastDeliveryTime.value = ''
        ev.target.finishMileage.value = ''
        ev.target.routeNumber.value = ''
        ev.target.location.value = ''
        ev.target.numberOfParcelsDelivered.value = ''
        ev.target.returnBackTime.value = ''
        ev.target.NumberOfParcelsBroughtBack.value = ''
        ev.target.ownerVehicleRegistration.value = '' 
        ev.target.amountDue.value = ''
    }

    // Set the date on change function
    var onChange = (ev) => {
        let currDate = ev.toDateString()
        setViewDate(currDate)
        setDateSelected({ ev })
    }

    var myId = props.location.pathname.replace(/\/billpay\/initial\//, '')

    return (
        <>
            <nav className='navBar'>
                <div>
                    <Link to='/' className='bottomLinks'>Back to Welcome</Link>
                </div>
                <div>
                    <Link to={`/managerInvoice/${myId}`} className='bottomLinks'>Make Current Invoice</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1>Billpay Page</h1>
                {driverDetails}
                <div className='formPageInline'>
                    <div className='calendarPlacment'>
                        <label>Delivery Date: {viewDate}</label><br />  
                        <Calendar onChange={onChange} className='calendar'/><br />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='billPayForm'>
                            <label>Miles Driven</label>
                            <input type="number" name='milesDriven' className='milesDriven'/> 

                            <label>First Delivery Time</label>
                            <input type="text" name='firstDeliveryTime' className='firstDeliveryTime'/>

                            <label>Start Mileage</label>
                            <input type="text" name='startMileage' className='startMileage'/>

                            <label>Last Delivery Time</label>
                            <input type="text" name='lastDeliveryTime' className='lastDeliveryTime'/>

                            <label>Finish Mileage</label>
                            <input type="text" name='finishMileage' className='finishMileage'/>

                            <label>Route Number</label>
                            <input type="text" name='routeNumber' className='routeNumber'/>

                            <label>Location</label>
                            <input type="text" name='location' className='location'/>

                            <label>Number of Parcels Delivered</label>
                            <input type="text" name='numberOfParcelsDelivered' className='numberOfParcelsDelivered'/>

                            <label>Return Back Time</label>
                            <input type="text" name='returnBackTime' className='returnBackTime'/>

                            <label>Number of Parcels Brought Back</label>
                            <input type="text" name='NumberOfParcelsBroughtBack' className='NumberOfParcelsBroughtBack'/>

                            <label>Owner Vehicle Registration</label>
                            <input type="text" name='ownerVehicleRegistration' className='ownerVehicleRegistration'/>

                            <label>Amount Due</label>
                            <input type="number" name='amountDue' className='amountDue'/>

                            <div className='submitPlacment'>
                            <input type="submit" value="Submit" className='submit' />
                            </div>
                        </form>
                    </div>
                </div>   
            </div>
        </>
    )
}

export default Billpay
import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ManagerInvoice = (props) => {
    const [userDetails, setUserDetails] = useState(null)

    useEffect(() => {
        var myId = props.location.pathname.replace(/\/managerInvoice\//, '/initial/')
        axios.get(`/billpay/${myId}`).then(res => {
            setUserDetails(res.data)
            console.log(res.data)
        })
    }, [])

    // calDate: (4) [{…}, {…}, {…}, {…}]
    // milesDriven: (4) ["23", "45", "123", "500"]
    // firstDeliveryTime: (4) ["32", "45", "123", "500"]
    // startMileage: (4) ["23", "45", "123", "500"]
    // lastDeliveryTime: (4) ["23", "45", "123", "500"]
    // finishMileage: (4) ["23", "45", "123", "500"]
    // routeNumber: (4) ["23", "45", "123", "500"]
    // location: (4) ["23", "45", "123", "500"]
    // numberOfParcelsDelivered: (4) ["23", "45", "123", "500"]
    // returnBackTime: (4) ["23", "45", "123", "500"]
    // numberOfParcelsBroughtBack: (4) ["23", "45", "123", "500"]
    // ownerVehicleRegistration: (4) ["23", "45", "123", "500"]
    // amountDue:

    var myTable;
    if (userDetails !== null) {
        myTable = (
            <table className='tableStyle'>
                        <tr>
                            <th colSpan='2'>{userDetails.name}</th>
                        </tr>
                        <tr>
                            <th colSpan='2'>Date</th>
                            <td>{userDetails.firstDeliveryTime[userDetails.firstDeliveryTime.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>First Delivery Time</th>
                            <td>{userDetails.firstDeliveryTime[userDetails.firstDeliveryTime.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Last Delivery Time</th>
                            <td>{userDetails.lastDeliveryTime[userDetails.lastDeliveryTime.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Start Mileage</th>
                            <td>{userDetails.startMileage[userDetails.startMileage.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Finish Mileage</th>
                            <td>{userDetails.finishMileage[userDetails.finishMileage.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Route Number</th>
                            <td>{userDetails.routeNumber[userDetails.routeNumber.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Location</th>
                            <td>{userDetails.location[userDetails.location.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Number of Parcels Delivered</th>
                            <td>{userDetails.numberOfParcelsDelivered[userDetails.numberOfParcelsDelivered.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Number of Parcels Not Delivered</th>
                            <td>{userDetails.numberOfParcelsBroughtBack[userDetails.numberOfParcelsBroughtBack.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Return Time</th>
                            <td>{userDetails.returnBackTime[userDetails.returnBackTime.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Owner Vehicle Registration</th>
                            <td>{userDetails.ownerVehicleRegistration[userDetails.ownerVehicleRegistration.length-1]}</td>
                        </tr>
                        <tr>
                            <th colSpan='2'>Amount Due</th>
                            <td>{userDetails.amountDue[userDetails.amountDue.length-1]}</td>
                        </tr>
                    </table>
        )
    } else {
        myTable = ('')
    }

    return (
        <>
            <nav className='navBar'>
                <div className='bottomLinks'>
                    <Link to='/' >Back to Welcome</Link>
                </div>
            </nav>
            <div className='mainAppThree'>
                <h1 className='welcomeManager'>Manager Invoicing Page</h1>
                {myTable}
            </div>
        </>
    )
}

export default ManagerInvoice


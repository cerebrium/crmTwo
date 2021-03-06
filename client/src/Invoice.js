import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Invoice = (props) => {
    const [userDetails, setUserDetails] = useState(null)

    console.log(props.user._id)

    useEffect(() => {
        axios.get(`/billpay/initial/${props.user._id}`).then(response => {
            console.log(response.data)
            setUserDetails(response.data)
        })
    }, [])

    var details;
    if (userDetails) {
        details = (
            <>
                <h3>Hours miles driven last week: {userDetails.milesDriven[userDetails.milesDriven.length-1]}</h3>
                <h3>Amount to be payed: {userDetails.amountDue[userDetails.milesDriven.length-1]}</h3>
            </>
        )
    } else {
        details = ('')
    }

    return (
        <div className='mainAppTwo'>
            <h1>Invoicing Page</h1>
            {details}
            <Link to='/' ><button className='bottomLink'>Back to Welcome</button></Link>
        </div>
    )
}

export default Invoice
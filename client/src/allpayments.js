import React, { useEffect, useState} from 'react'
import axios from 'axios'

const Allpayments = () => {
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        axios.get('/auth/alldrivers').then( response => {
            setDrivers(response.data)
        })
    }, [])


    return (
        <h1>All Payments</h1>

    )
}

export default Allpayments
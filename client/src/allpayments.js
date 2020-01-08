import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Allpayments = () => {
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        axios.get('/auth/alldrivers').then( response => {
            console.log(response.data)
            setDrivers(response.data)
        })
    }, [])

    // Quicksort
    var quicksort = (arr, low, high) => {
        if (low === undefined) {
            low = 0
        }
        if (high === undefined) {
            high = arr.length - 1
        }
        if (low < high) {
            let pivot = partition(arr, low, high)
            quicksort(arr, low, pivot)
            quicksort(arr, pivot+1, high)
        }
        return arr
    }

    var partition = (arr, low, high) => {
        let myNum = Math.floor(low + (high - low) / 2)
        let pivot = arr[myNum]

        let i = low - 1
        let j = high + 1

        while (true) {
            do {
                i++
            } 
            while (arr[i] < pivot)
            do {
                j--
            } 
            while (arr[j] > pivot)
            if (i >= j) {
                return j
            }
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    // end of quicksort

    if (drivers.length > 0) {
        let datesArray = drivers[0].calDate.map((ele, index) => {
            return {key: index, value: ele}
        })
        console.log(datesArray)
    }

    return (
        <>
            <nav className='navBar'>
                <div>
                    <Link to='/' className='bottomLinks'>Back to Welcome</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1>All Payments</h1>
            </div>
        </>
    )
}

export default Allpayments
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Swindon = () => {
    const [ drivers, setDrivers ] = useState([])
    const [ driverArray, setDriverArray ] = useState([])
    const [ logicGate, setLogicGate ] = useState(true)
    const [ getMoreData, setGetMoreData ] = useState(false)

    useEffect(() => {
        axios.post('/auth/location', {location: 'swindon'}).then( response => {
            setDrivers(response.data)
            console.log(response.data)
        })
        setGetMoreData(false)
    }, [getMoreData])

    var myDrivers; 
    if (driverArray.length >= 1) {
        myDrivers = driverArray.map((ele, id) => <h3 key={id} ><Link to={`/billpay/initial/${ele._id}`} id={ele._id} className='bottomLinks'>{ele.name}</Link></h3>)
    } else {
        myDrivers = drivers.map((ele, id) => <h3 key={id} ><Link to={`/billpay/initial/${ele._id}`} id={ele._id} className='bottomLinks'>{ele.name}</Link></h3>)
    }
    
    // letting the search function have content live
    let onChange = (ev) => {
        let myNameArray = drivers.map((ele, index) => {
            return {
                name: ele.name,
                _id: ele._id
            } 
        })
        searcher(ev.target.value, myNameArray)
    }
    
    // function for stopping the search function from firing to a new page
    let onSubmit = (ev) => {
        ev.preventDefault()
    }

    // function for adding drivers
    let onSubmitAddDriver = (ev) => {
        ev.preventDefault()
        axios.post('/auth/add', {
            name: ev.target.name.value,
            email: ev.target.email.value
        }).then(res => {
            console.log(res)
        })
        setGetMoreData(true)
    }
    
    // function for the search bar to locate drivers
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

    let onClick = (ev) => {
        if (logicGate) {
            setLogicGate(false)
        } else {
            setLogicGate(true)
        }
    }

    var content;
    if (logicGate) {
        content = (
            <div className='driversClass'>
                <form onSubmit={onSubmit}>
                    <label>Select a driver</label>
                    <input type="text" name='inputText' onChange={onChange}/>
                </form>
                {myDrivers}
            </div>
        )
    } else {
        content = (
            <form onSubmit={onSubmitAddDriver}>
                <label>Name:</label><br />
                <input type="text" name='name'/><br />
                <label>Email:</label><br />
                <input type="text" name='email'/><br />
                <input type="submit" value="submit"/>
            </form>
        )
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
                    <Link to='/bristol' className='bottomLinks'>Bristol Dashboard</Link>
                </div>
                <div>
                    <Link to='/newdrivers' className='bottomLinks'>New Drivers</Link>
                </div>
                <div>
                    <Link to='/swindon' className='bottomLinks'>Swindon Dashboard</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1 className='welcomeManager'>Swindon Dashboard</h1>
                <div className='myDataManagerPage'>
                    <div className='allDataClass'>
                        <div className='managerOptions'>
                            <h3 onClick={onClick} className='onClickRows'>View all Drivers</h3>
                            <h3 onClick={onClick} className='onClickRows'>Add Driver</h3>
                        </div>
                    </div>
                    <hr />
                    {content}
                </div>
            </div>
        </>
    )
}

export default Swindon
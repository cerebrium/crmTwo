import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SuperManager = () => {
    const [ managers, setManagers ] = useState([])

    useEffect(() => {
        axios.get('/auth/super').then( res => {
            console.log(res)
            setManagers(res.data)
        })
    }, [])

    var managerList;
    if (managers) {
        managerList = managers.map((ele, id) => <h3 key={id}>{ele.name}</h3>)
    } else {
        managerList = ''
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
                    <Link to='/newdrivers' className='bottomLinks'>New Drivers</Link>
                </div>
                <div>
                    <Link to='/bristol' className='bottomLinks'>Bristol Dashboard</Link>
                </div>
                <div>
                    <Link to='/swindon' className='bottomLinks'>Swindon Dashboard</Link>
                </div>
            </nav> 
            <div className='mainAppTwo'>
                <h1>Super Manager Page</h1>
                {managerList}
            </div>
        </>
    )
}

export default SuperManager
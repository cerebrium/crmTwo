import React from 'react'
import { Link } from 'react-router-dom'

const WelcomeDriver = () => {
    return (
        <div className='mainAppTwo'>
            <nav>
                <Link to='/invoice'>Invoices</Link>
            </nav>
            <h1>WelcomeDriver Page</h1>
        </div>
    )
}

export default WelcomeDriver
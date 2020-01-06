import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import axios from 'axios';
import Billpay from './Billpay';
import Invoice from './Invoice';
import WelcomeManager from './welcomeManager'
import WelcomeDriver from './welcomeDriver'
import AllPayments from './allpayments'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  // Setting state with the user details retrieved using googles Oauth
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState('')

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
    setUserName(response.profileObj.givenName)
    setUserId(response.profileObj.googleId)
    setUserEmail(response.profileObj.email)
      axios.post('/auth/signup', {
        name: response.profileObj.name, 
        email: response.profileObj.email, 
      }).then(res => {
        setUser(res.data)
        if (res.data.manager === false) {
          setManager('no')
        }
        if (res.data.manager === true) {
          setManager('yes')
        }
      })
  }

  // set manager field as true
  var handleClickYes = (ev) => {
    ev.preventDefault()
    console.log('form submitted')
    axios.post('/auth/manager', {
      email: userEmail,
      isManager: true
    }).then(response => {
      console.log(response.data)
      setManager('yes')
    })

  }
  
  // set manager field as false
  var handleClickNo = (ev) => {
    ev.preventDefault()
    console.log('form submitted')
    axios.post('/auth/manager', {
      email: userEmail,
      isManager: false
    }).then(response => {
      console.log(response.data)
      setManager('no')
    })
  }

  // conditional rendering of nav bar
  var navbar;
  if (userName && manager) {
    if (manager === 'yes') {
      // MANAGER NAVBAR
      navbar = (
        <>
          <Route exact path='/' component={WelcomeManager} />
          <Route exact path='/allpayments' component={AllPayments} />
          <Route exact path='/billpay/initial/:handle' component={Billpay} />
        </>
      )
    } else {
      // DRIVER NAVBAR
      navbar = (
        <>
          <Route exact path='/' component={WelcomeDriver} />
          <Route exact path='/invoice' render={ () => <Invoice user={user} /> }  />
        </>
      )
    }
  } 

  // conditional rendering of name once logged in
  var content;
  if (userName && !manager) {
    content = (
      <>
        {navbar}
        <div className='mainApp'>
          <h1>Amazon Delivery Service Crm</h1>
          <form >
            <label>Are you a Manager?</label><br />
            <input type="radio" name="yes" onClick={handleClickYes}/>yes
            <input type="radio" name="no" onClick={handleClickNo}/>no
          </form>
        </div>
      </>
    )
  } else if (userName && manager) {
    if (manager === 'yes') {
      content = (
        <div>
          <nav>
            {navbar}
          </nav>
        </div>
      )
    } else if (manager === 'no'){
      content = (
        <div>
          <nav>
            {navbar}
          </nav>
        </div>
      )
    }
  } else {
    content = (
      <div className='mainApp'>
        <div className='titlePage'>
          <h1>Amazon Delivery Service Internal Website</h1>
          <h3>please login with your google account</h3>
        </div>
        <div className='googleLogin'>
          <GoogleLogin
            clientId="801108272625-cbbc8i5j8v8s423p95mkte842cdp7d32.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    )
  }

  return (
    <Router>
        {content}
    </Router>
  );
}

export default App;
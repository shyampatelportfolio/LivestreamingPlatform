import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import UseCheckCredentials from '../Hooks/UseCheckCredentials';

export default function Navbar() {
  
  const navigate = useNavigate();
  const [information, Logout, refetch] = UseCheckCredentials(true)

  return (
    <div className="navbar-container">
        <Link to="/">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src="/Images/LogoLight.png" alt="" />
          </div>
        </div>
        </Link>
        <Link to="/"><div className="navbar-item">Home</div></Link>
        <Link to="/Explore"><div className="navbar-item">Explore</div></Link>
        <Link to="/User"><div className="navbar-item">Stream</div></Link>
        <div className="navbar-right selected">
            {information == null? 
              <div className='navbar-item right' onClick={() => navigate('/SignIn')}>Sign In</div>
            :
            <>
              <div className='navbar-item right'>{information.username && information.username}</div>
              <div onClick={Logout} className='navbar-item right'>Sign Out</div>
            </>
            }
            <div className="account-image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill='white'/>
                <path d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z" fill='white'/>
              </svg>

            </div>
        </div>

    </div>
  )
}

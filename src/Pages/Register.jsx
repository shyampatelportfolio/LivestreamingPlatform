import React from 'react'
import GoogleLoginButton from '../Components/GoogleLoginButton';
import axios from 'axios';
import { useRef, useState, useContext, useEffect} from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import HistoryContext from '../Context/HistoryContext'
import UseCheckCredentials from '../Hooks/UseCheckCredentials';
import AccountInput from '../Components/AccountInput';

export default function Register() {

    const { domainHistory, addToHistory, findLastPage } = useContext(HistoryContext)
    const location = useLocation();
    const invalidcreds = useRef()
    const eyeRef = useRef()
    const navigate = useNavigate();
    const [information, Logout, refetch] = UseCheckCredentials(false)
   
      async function handleSubmit(){
        let validInput = true
        const inputs = [...document.querySelectorAll('.login-input.register')]
        inputs.forEach(input => {
          input.classList.remove('empty')
         
        })
        invalidcreds.current.textContent = ""
        inputs.forEach(input => {
          if(input.value == ''){
            input.classList.add('empty')
            invalidcreds.current.textContent = "Fill in all details"
            validInput = false
          }
        })
        if(validInput){
          await handleRegister()
        }
      }
      async function handleRegister(){
        const usernameText = document.querySelector('.login-input.username.register').value
        const passwordText = document.querySelector('.login-input.password.register').value
        const emailText = document.querySelector('.login-input.email.register').value

        const info = {
          "email" : `${emailText}`,
          "name" : `${usernameText}`,
          "password" : `${passwordText}`
        }
        try{
          const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/register`, info, { withCredentials: true })
          if (res.status === 200) {
            refetch()
            setTimeout(() => {
              const lastPage = findLastPage()
              navigate(lastPage);
            }, 1000)
            invalidcreds.current.classList.add('success')
            invalidcreds.current.textContent = res.data
          } else {
            invalidcreds.current.textContent = res.data
          }
  
        }
        catch (error){
          if (error.response) {
            invalidcreds.current.textContent = error.response.data
            }
        }
      }


      function handleEye(){
        const passwordContainer = document.querySelector('.login-input.register.password')
        eyeRef.current.classList.toggle('active')
        if (passwordContainer.type === 'password') {
          passwordContainer.type = 'text'
        } else {
          passwordContainer.type = 'password'
        }
      }
      function actionFunction(){
        refetch()
        setTimeout(() => {
          const lastPage = findLastPage()
          navigate(lastPage);
        }, 1000)
      }
    

    
     
  return (
    <>
        <div className='login-page'>
            <div className='login-container'>
            <div className="login-title">Register</div>
            <GoogleLoginButton text={"Register with Google"} actionFunction={actionFunction}/>
            <div className='login-divider-container'>
                <span className="login-divider-line"></span> 
                <span className="login-divider-text">or</span>
                <span className="login-divider-line"></span>
            </div>
            <AccountInput type='text' name='email' page='register' defaultValue={location.state && location.state.email}></AccountInput>
            
            <AccountInput type='text' name='username' page='register'></AccountInput>
            <div className='login-password-container'>
                <div className='login-eye-container' onClick={handleEye}>
                    <div ref={eyeRef} className='login-eye active'></div>
                </div>
                <AccountInput type='password' name='password' page='register'></AccountInput>
            </div>
            <br></br>
            <div className="login-button" onClick={handleSubmit}>Register</div>
            <div className='login-details-container'>
                <div className='login-textfield'>Already have an account?</div>
                <div className='login-textfield'><Link to="/SignIn">Log In</Link></div>
            </div>
            <div className='login-prompt register' ref={invalidcreds}>{location.state && location.state.message}</div>
            </div>
        </div>
    </>
  )
}

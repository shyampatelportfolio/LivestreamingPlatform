import React from 'react'
import GoogleLoginButton from '../Components/GoogleLoginButton';
import axios from 'axios';
import { useRef, useState, useContext, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import HistoryContext from '../Context/HistoryContext'
import UseCheckCredentials from '../Hooks/UseCheckCredentials';
import AccountInput from '../Components/AccountInput';

export default function SignIn() {

  const { domainHistory, addToHistory, findLastPage } = useContext(HistoryContext)

  const invalidcreds = useRef()
  const eyeRef = useRef()
  const navigate = useNavigate();
  const [information, Logout, refetch] = UseCheckCredentials(false)

    async function handleSubmit(){
      let validInput = true
      const inputs = [...document.querySelectorAll('.login-input.login')]
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
        await handleLogin()
      }
    }
    async function handleLogin(){
      const usernameText = document.querySelector('.login-input.username.login').value
      const passwordText = document.querySelector('.login-input.password.login').value

      const info = {
        "name" : `${usernameText}`,
        "password" : `${passwordText}`
      }
      try{
        const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/login`, info, { withCredentials: true })
        if (res.status === 200) {
          actionFunction()
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

    function actionFunction(){
      refetch()
      setTimeout(() => {
        const lastPage = findLastPage()
        navigate(lastPage);
      }, 1000)
    }
    function handleEye(){
      const passwordContainer = document.querySelector('.login-input.login.password')
      eyeRef.current.classList.toggle('active')
      if (passwordContainer.type === 'password') {
        passwordContainer.type = 'text'
      } else {
        passwordContainer.type = 'password'
      }
    }

     
  return (
    <>


       <div className='login-page'>
            <div className='login-container'>
            <div className="login-title">Sign In</div>
            <GoogleLoginButton text={"Sign In with Google"} actionFunction={actionFunction}/>
            <div className='login-divider-container'>
                <span className="login-divider-line"></span> 
                <span className="login-divider-text">or</span>
                <span className="login-divider-line"></span>
            </div>
            <AccountInput type='text' name='username' page='login' placeholderDouble={true}></AccountInput>
            <div className='login-password-container'>
                <div className='login-eye-container' onClick={handleEye}>
                    <div ref={eyeRef} className='login-eye active'></div>
                </div>
                <AccountInput type='password' name='password' page='login'></AccountInput>
            </div>
            <br></br>
            <div className="login-button" onClick={handleSubmit}>Sign In</div>
            <div className='login-details-container'>
                <div className='login-textfield'>Dont have an account?</div>
                <div className='login-textfield'><Link to="/Register">Register</Link></div>
            </div>
            <div className='login-prompt login' ref={invalidcreds}></div>
            </div>
        </div>
        <div className="instructions-icon">
          <img src="/Svg/Question.svg" alt="" />
          <div className="instructions-icon-after">
            <div className="instructions-icon-item">Test Account</div>
            <div className="instructions-icon-item">Username : john</div>
            <div className="instructions-icon-item">Password : smith</div>
          </div>
        </div>
    </>
  )
}

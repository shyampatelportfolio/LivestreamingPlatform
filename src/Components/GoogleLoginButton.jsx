import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton({text, actionFunction}) {
    const navigate = useNavigate();
  
    const login = useGoogleLogin({
        onSuccess: tokenResponse => validateGoogle(tokenResponse),
        onError : () => {
          console.log('Login Failed');
        }
      });


    async function validateGoogle(tokenResponse){
        const accessToken = tokenResponse.access_token
        let url1 = `${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/validateGoogle`
        const info = {
          "accessToken" : accessToken,
        }
        const response = await axios.post(url1, info, { withCredentials: true })
        if(response.data.message == 'New Account'){
          navigate('/Register', {state : {email : response.data.email, message : 'Email not Recognised, Please Register'}})
        }else if(response.data.message == 'Password Accepted'){
          actionFunction()
        }
    } 
  return (
    <>  
        <div className='google-button-container' onClick={() => login()}>
            <div className='google-button'></div>
            <div className='google-button-text'>{text}</div>
        </div>
        
    </>

  )
}

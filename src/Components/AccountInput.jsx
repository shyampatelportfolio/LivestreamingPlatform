import React from 'react'
import { useRef, useState, useContext, useEffect} from 'react'
import { capitalizeMyString } from '../Functions/Functions'
export default function AccountInput({type, name, page, placeholderDouble, defaultValue}) {

    const inputRef = useRef()
 
    function handleInputChange(inputValue){
        const otherRefs = [...document.querySelectorAll(`.login-input.${page}`)]
        let bool = true
        otherRefs.forEach(x => {
            if(x.value == '') bool = false
        })
        if(bool){
          resetPrompt()
        }
        inputRef.current.classList.remove('empty')

    }
    function resetPrompt(){
        const prompt = document.querySelector(`.login-prompt.${page}`)
        prompt.textContent = ""
    }

  return (
    <input ref={inputRef} className={`login-input ${page} ${name}`} type={type} placeholder={placeholderDouble? 'Username or Email' : capitalizeMyString(name)} onChange={(e) => handleInputChange(e.target.value)} defaultValue={defaultValue}></input>

  )
}

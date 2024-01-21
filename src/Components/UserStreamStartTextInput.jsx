import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'

export default function UserStreamStartTextInput({sendMessage}) {

    const inputRef = useRef()

  function expandTextArea(textarea){
    const heightInitial = textarea.scrollHeight
    console.log(heightInitial)
    if(heightInitial < 33){
      textarea.style.height = '24px'
    }else{
      textarea.style.height = "auto";  
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }
  function handleKeyDown(e){
    if (e.key === 'Enter') {
      handleEnterText()
    }
  }
  return (
    <>
    <div className="user-stream-start-input-container">
        <textarea ref={inputRef} onKeyDown={handleKeyDown} onInput={(e) => expandTextArea(e.target)} className='user-stream-start-input-forchat description' placeholder='Stream Description' spellCheck={false}></textarea>
    </div>
    </>

  )
}

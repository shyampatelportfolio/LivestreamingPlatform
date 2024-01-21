import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'

export default function TextAreaInput({sendMessage}) {

  const inputRef = useRef()

  function expandTextArea(textarea){
    const heightInitial = textarea.scrollHeight
    if(heightInitial < 26 && heightInitial > 14){
      textarea.style.height = '14px'
    }else if(heightInitial == 26){
      textarea.style.height = '27px'
    }else if(heightInitial == 14){
      return
    }else if(heightInitial < 14){
      textarea.style.height = '14px'
    }else{
      textarea.style.height = "auto";  
      textarea.style.height = textarea.scrollHeight + "px";
    }
    }
  function handleEnterText(){
    const text = inputRef.current.value
    sendMessage(text)
    }
  function handleKeyDown(e){
    if (e.key === 'Enter') {
      handleEnterText()
    }
  }
  return (
    <>
    <div className="stream-input-container">
        <textarea ref={inputRef} onKeyDown={handleKeyDown} onInput={(e) => expandTextArea(e.target)} className='stream-input-forchat' placeholder='Type here...' spellCheck={false}></textarea>

        <div onClick={handleEnterText} className="stream-input-button"></div>
    </div>
    </>

  )
}

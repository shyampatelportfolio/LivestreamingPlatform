import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'

export default function UserStreamStartTitleInput({sendMessage}) {

    const inputRef = useRef()

  function expandTextArea(textarea){
    const heightInitial = textarea.scrollHeight
    console.log(heightInitial)
    if(heightInitial < 77){
      textarea.style.height = '49px'
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
    <div className="user-stream-start-input-container title">
        <textarea ref={inputRef} onKeyDown={handleKeyDown} onInput={(e) => expandTextArea(e.target)} className='user-stream-start-input-forchat title' placeholder='Stream Title' spellCheck={false}></textarea>
    </div>
    </>

  )
}

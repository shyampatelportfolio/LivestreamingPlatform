import React, { useRef } from 'react'
import { useState } from 'react'
import TextAreaInput from './TextAreaInput'
import UserStreamStartTextInput from './UserStreamStartTextInput'
import UserStreamStartTitleInput from './UserStreamStartTitleInput'

export default function UserStreamStart({startStream}) {

    const carouselRef = useRef()
    const [mediaSelection, setMediaSelection] = useState(null)

      
  function handleMediaItem(e){
    const target = e.target.closest('.user-stream-media-item')
    const allItems = [...document.querySelectorAll('.user-stream-media-item')]
    if(target){
      const bool = !target.classList.contains('selected')
      allItems.forEach(x => {
        x.classList.remove('selected')
      })
      if(bool){
        setMediaSelection(target.dataset.selection)
        target.classList.add('selected')
      }else{
        setMediaSelection(null)
      }
    }
  }
  function handleSwipeToThird(){
    carouselRef.current.style.transform = 'TranslateX(-66.6%)'
  }
  function handleSwipeToSecond(){
    carouselRef.current.style.transform = 'TranslateX(-33.3%)'
  }
  function handleSwipeToFirst(){
    carouselRef.current.style.transform = 'TranslateX(0%)'
  }
  function submitForm(){
    const title = document.querySelector('.user-stream-start-input-forchat.title').value
    const description = document.querySelector('.user-stream-start-input-forchat.description').value
    console.log(title, description)
    if(title.length >  400 || description.length > 400){
      window.alert('input is too long')
      return
    }
    const streamMetaData = {
      TotalViews : 0,
      TotalViewers : 0, 
      StreamDescription : description,
      StreamName : title,
      StreamAuthor : 'Null'
    }
    startStream(mediaSelection, streamMetaData)
  }
  return (
    <>
       <div ref={carouselRef} className="user-stream-carousel">

            <div className="user-stream-options first">
                
                <div className="user-stream-options-title">
                    Start Streaming Now!
                </div>
                <div className="user-stream-options-description">
                    Embark on a journey to connect with the world in real-time. Whether you're sharing your experiences, expertise, or simply connecting with loved ones, the power to broadcast and engage with a global audience is at your fingertips. Connect, share, and bring your stories to life through seamless streaming, connecting you to a vast and dynamic online community.
                </div>
                <div onClick={handleSwipeToSecond} className="user-stream-options-start">Start Stream</div>
            </div>
            <div className="user-stream-options">
                <div onClick={handleSwipeToFirst} className="user-stream-back">
                    <img src="/Svg/Back.svg" alt="" />
                </div>
                <div className="user-stream-media-container">
                    <div data-selection={'Webcam'} onClick={handleMediaItem} className="user-stream-media-item">
                        <img src="/Svg/Webcam.svg" alt="" />
                        <div className="user-stream-media-item-name">Webcam</div>
                    </div>
                    <div data-selection={'Screen'} onClick={handleMediaItem} className="user-stream-media-item">
                        <img src="/Svg/Screen.svg" alt="" />
                        <div className="user-stream-media-item-name">Screen</div>
                    </div>
                    {mediaSelection !== null &&
                        <div onClick={handleSwipeToThird} className="user-stream-media-next">Next</div>
                    }
                </div>
            </div>
            <div className="user-stream-options">
                <div onClick={handleSwipeToSecond} className="user-stream-back">
                    <img src="/Svg/Back.svg" alt="" />
                </div>
                <div className="user-stream-form-container"> 
                    <UserStreamStartTitleInput></UserStreamStartTitleInput>
                    <UserStreamStartTextInput></UserStreamStartTextInput>
                    {mediaSelection !== null &&
                        <div onClick={submitForm} className="user-stream-media-record">Start Recording</div>
                    }
                </div>
            </div>
        
       </div>
    </>
  )
}

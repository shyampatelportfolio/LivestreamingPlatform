import React from 'react'
import { useRef, useState, useEffect } from 'react'
import useDragStatic from '../Hooks/UseDragStatic'

export default function ChatBox({chat}) {
    const [messages, setMessages] = useState([]);
    const carouselRef = useRef()
    const chatRef = useRef()
    const wrapperRef = useRef()


    const [handleMouseDownDrag, cancelDrag, enableDrag] = useDragStatic(wrapperRef)
    

  useEffect(() => {
  const carousel = carouselRef.current
  const container = chatRef.current
  container.addEventListener('wheel', (e) => handleChatScroll(e, carousel, container))

  return () => {
    container.removeEventListener('wheel', handleChatScroll);
    carousel.style.transform = `translateY(0px)`
    carousel.dataset.scroll = 0
  }
  }, [])
  useEffect(() => {
    handleUpdateChat(chat)
  }, [chat])


  function handleUpdateChat(chat){
    const currentChatSize = messages.length
    if(currentChatSize == 0){
        chat.forEach(x => {
            addToChat(`${x.name} : ${x.message}`)
        })
        scrollToBottom()
    }else{
        const x = chat[currentChatSize]
        addToChat(`${x.name} : ${x.message}`)
    }
    setMessages(chat)
  }
  function addToChat(text){
    const chatContainer = carouselRef.current
    const newDiv = document.createElement('div')
    newDiv.className += ' chat-message'
    newDiv.textContent = text
    chatContainer.append(newDiv)
    const isSticky = chatContainer.dataset.sticky
    if(isSticky == 0){
      return
    }else{
      scrollToBottom()
    }
  }




  
  function scrollToBottom(){
  const carousel = carouselRef.current
  const container = chatRef.current
  const carouselHeight = carousel.scrollHeight
  const containerHeight = Number(window.getComputedStyle(container).height.slice(0,-2))
  const nextPercentage = -carouselHeight + containerHeight
  carousel.dataset.scroll = nextPercentage
  carousel.style.transform = `translateY(${nextPercentage}px)`
  }
  function handleChatScroll(e, carousel, container){
  e.preventDefault()
  carousel.dataset.sticky = 0
  const carouselHeight = carousel.scrollHeight
  const containerHeight = Number(window.getComputedStyle(container).height.slice(0,-2))
  if(containerHeight > carouselHeight) return
  let nextPercentage
  if(e.deltaY < 0){
      if(carousel.dataset.scroll < -containerHeight) {
          nextPercentage = containerHeight + parseFloat(carousel.dataset.scroll)
      }else
      {
          nextPercentage = 0 
      }
  }else{
      if(carousel.dataset.scroll > -carouselHeight + 2*containerHeight) {
          nextPercentage = -containerHeight + parseFloat(carousel.dataset.scroll)
      }else{
          carousel.dataset.sticky = 1
          nextPercentage = -carouselHeight + containerHeight
      }
  }
  carousel.dataset.scroll = nextPercentage
  carousel.style.transform = `translateY(${nextPercentage}px)`
  }
  return (
    <>
        <div ref={wrapperRef} className="chat-wrapper">
            <div className="chat-overlay"></div>
            <div onMouseDown={handleMouseDownDrag} className="chat-drag-container">
                <img src="/Svg/DragIcon.svg" alt="" draggable={false} />

            </div>
            <div ref={chatRef} className="chat-container">
                <div ref={carouselRef} className="chat-carousel" data-scroll="0" data-sticky="1">

                </div>
            </div>
        </div>
    </>
  )
}

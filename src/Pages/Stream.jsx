import { useRef, useState, useEffect } from 'react'
import React from 'react'
import Peer from 'peerjs';
import Streams from '../Json/Streams.json'


import { HubConnectionBuilder } from '@microsoft/signalr'
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import ChatBox from '../Components/ChatBox';
import TextAreaInput from '../Components/TextAreaInput';
import { useNavigate } from 'react-router-dom';
import StreamDataContainer from '../Components/StreamDataContainer';

export default function Stream() {

  const navigate = useNavigate();
  const [lastMessageSent, setLastMessageSent] = useState(null)
  const [messages, setMessages] = useState([]);
  const {id} = useParams()
  const videoRef = useRef(null);
  const [connection, setConnection] = useState(null);
  const streamerCallRef = useRef()
  const [peerId, setPeerId] = useState("");
  const peerRef = useRef()
  const [metaData, setMetaData] = useState({
    totalViews : 0,
    totalViewers : 0, 
    streamDescription : 'Sorry, the user is not currently streaming. Please check back later or explore other content in the meantime.',
    streamName : 'Stream is Offline',
    streamAuthor : 'Null',
    streamLive : false
  })

  useEffect(() => {
    if(!id){
      navigate('/');
    }else{
      initiatePeers()
    }
    checkDefaultStreams()
  }, [])
  useEffect(() => {
    initiateConnection()
  }, [connection])



  function checkDefaultStreams(){
    Streams.streams.forEach(x => {
      if(id == x.author){
        videoRef.current.src = `/Videos/Stream${x.id}.mp4`
      }
    })
  }
  function sendMessage(inputText){
    const currentTime = new Date();
    if(lastMessageSent !== null){
      const elapsedMilliseconds = currentTime - lastMessageSent;
      if(elapsedMilliseconds < 300) return
    }
    setLastMessageSent(currentTime)

    if(inputText.length > 400) return
    if (inputText.trim() !== '') {
      connection.invoke('SendMessageToGroup', id,  inputText)
          .catch((error) => {
          console.log('Error sending message: ', error);
          });
      }
  }

 
  function initiateConnection(){
  if(connection){
    connection.start().then(() => {
        connection.on('receiveChat', (chat, metaDataDto) => {
            console.log(metaDataDto)
            setMessages(chat);
            setMetaData(metaDataDto)
        });
        connection.on('receiveMessage', (message) => {
          console.log(message)
            setMessages(prev => [...prev, message])
        });
        connection.on('streamStarted', (userid, metaDataDto) => {
            setMetaData(metaDataDto)
            const conn = peerRef.current.connect(userid);
            conn.on('open', () => {
                conn.send('hi!');
                conn.close()
            });       
        })  
        connection.on('streamEnded', (metaDataDto) => { 
            console.log('stream ended')
            setMetaData(metaDataDto)
            streamerCallRef.current.close()
            videoRef.current.srcObject = null
            videoRef.current.src = "/Videos/Stream1.mp4"
            videoRef.current.classList.remove('stream-active')
          })
        connection.on('newUserJoined', (userid, metaDataDto) => {
            console.log(metaDataDto)
            setMetaData(metaDataDto)
        })  
        connection.on('userLeaves', (userid, metaDataDto) => { 
            console.log(metaDataDto)
            setMetaData(metaDataDto)
        }) 
        connection.invoke('newUserJoined', id, peerId)

      })
    }
  }
  function initiatePeers(){
      const connection1 = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_API_BASE_URL}/hubs/video`)
      .build();
      let mypeer = new Peer(undefined, {
      })
      peerRef.current = mypeer
      mypeer.on('open',  myid => {
        setPeerId(myid)
        mypeer.on('call', call => {
          console.log('streamer calling')
            call.answer()
            call.on('stream', userstream => {
                streamerCallRef.current = call
                videoRef.current.srcObject = userstream
                videoRef.current.classList.add('stream-active')
              })    
        }) 
        setConnection(connection1)
      })     
  }



  function handleMouseEnter(e){
    const dataContainer = document.querySelector('.stream-video-data-details')
    dataContainer.style.opacity = 1
  }
  function handleMouseLeave(e){
    const dataContainer = document.querySelector('.stream-video-data-details')
    dataContainer.style.opacity = 0
  }

  return (
    <>
      <Navbar></Navbar>
    
      <div onClick={() => console.log(metaData)} className="stream-container">
          <div className="stream-video-container">
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="stream-video-hover-box">
            </div>
            <StreamDataContainer metaData={metaData} id={id}></StreamDataContainer>
              <video className='stream-video-item' ref={videoRef} src="/Videos/City2.mp4" autoPlay={true} loop={true} ></video>
          </div>
          <ChatBox chat={messages}></ChatBox>
          <TextAreaInput sendMessage={sendMessage}></TextAreaInput>
      </div>
     
    
    </>
  )
}

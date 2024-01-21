import { useRef, useState, useEffect, useContext } from 'react'
import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Peer from 'peerjs';

import { HubConnectionBuilder } from '@microsoft/signalr'
import Navbar from '../Components/Navbar';
import UserStreamStart from '../Components/UserStreamStart';
import ChatBox from '../Components/ChatBox';

export default function User() {

  const promptRef = useRef()
  const [streamActive, setStreamActive] = useState()
  const videoRef = useRef()
  const peerRef = useRef()
  const [connection, setConnection] = useState(null);
  const connectionRef = useRef()
  const [peerId, setPeerId] = useState("");
  const myStream = useRef()
  const calls = useRef([])
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    
    TotalViews : 0,
    TotalViewers : 0, 
    StreamDescription : 'Unspecified',
    StreamName : 'Unspecified',
    StreamAuthor : 'Null',
    StreamLive : true
  })

  const {data : information, status, isLoading, refetch} = useQuery({
    queryKey : ['UserData'],
    queryFn : fetchUserData,
    enabled : false
  })

  useEffect(() => {
    initiateConnection()
  }, [connection])

  async function fetchUserData(){
    const info = {
      "name" : `f`,
      "password" : `f`
    }
    return axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/Authorization/findUserDetails`, info, { withCredentials: true })
    .then(res => {
      return res.data
    })
  }

 
 
  function initiateConnection(){

      if(connection){
          connection.start().then(() => {
            connection.on('receiveChat', (chat, metaData) => {
              setMessages(chat);
            });
            connection.on('receiveMessage', (message) => {
              setMessages(prev => [...prev, message])
            });
            connection.on('newUserJoined', (userid) => {
              console.log(222)

              const call = peerRef.current.call(userid, myStream.current)
              const item = {
                id: userid,
                call: call
              }
              calls.current = [...calls.current, item]
              console.log(222)
            })
            connection.on('userLeaves', (userid, metaDataDto) => { 
              console.log('user left', userid)
              calls.current.forEach(item => {
                  if( item.id == userid){
                      item.call.close()
                  }
                  })
                  calls.current = calls.current.filter(item => {
                    return item.id !== userid
                  })
            }) 
            connection.on('streamEnded', (metaDataDto) => {   
              calls.current.forEach(item => {
                    item.call.close()
                })
                calls.current = []
            })
            connection.on('streamRunningStatus', (message) => {
              if(message == 'Running'){
                window.alert(
                  'Someone is Already streaming with that name'
                )
                setTimeout(() => {
                  window.location.reload();
                  
                }, 1500);
              }else if(message == 'Not Running'){
                setStreamActive(true)
              }
            });
            connection.invoke('startStreaming', peerId, formData)
          })
        }
  }
  function startStream(mediaSelection, formDataDto){
    if(information == null){
      promptRef.current.textContent = 'Please Sign In Before Streaming'
      return
    }

    setFormData(formDataDto)
    if(mediaSelection == 'Screen'){
      streamFromScreen()
    }else if(mediaSelection == 'Webcam'){
      streamFromWebCam()
    }
  }
  function initiatePeers(stream){

          const connection1 = new HubConnectionBuilder()
          .withUrl(`${import.meta.env.VITE_APP_API_BASE_URL}/hubs/video`)
          .build();
                  let mypeer = new Peer(undefined, {
                  })
                  peerRef.current = mypeer
                  mypeer.on('open',  myid => {
                    setPeerId(myid)
                    mypeer.on('connection', function(conn) {
                      conn.on('data', (data) => {
                        const call = mypeer.call(conn.peer, stream)
                        const item = {
                          id: conn.peer,
                          call: call
                        }
                        calls.current = [...calls.current, item]
                      });
                    });
                    connectionRef.current = connection1
                    setConnection(connection1)
                  })     
  }
  function stopStreaming(){

    setStreamActive(false)
    if(connectionRef.current){

      connectionRef.current.invoke('stopStreaming')
    }

    if (myStream.current) {
      const tracks = myStream.current.getTracks();
      tracks.forEach((track) => track.stop());
      myStream.current = null
      videoRef.current.srcObject = null
      videoRef.current.src = '/Videos/Stream1.mp4';
    }
  }


  function streamFromScreen(){
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const constraints = {
        video: {
          logicalSurface: true,     
          frameRate: { ideal: 30 }  
        }
      };
    
      navigator.mediaDevices.getDisplayMedia(constraints)
        .then(stream => {
          myStream.current = stream
          initiatePeers(stream)
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          mediaRecorder.onstop = () => {
            stopStreaming()
          };

          videoRef.current.srcObject = stream
        })
        .catch(error => {
          console.error('Error capturing screen:', error);
        });
    } else {
      console.error('getDisplayMedia API is not supported in this browser.');
  }
  }
  function streamFromWebCam(){
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      myStream.current = stream
      initiatePeers(stream)
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      mediaRecorder.onstop = () => {
        stopStreaming()
      };
      videoRef.current.srcObject = stream

    })
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={`user-stream-container ${ streamActive && 'stream-active'}`}>
        <div className="user-stream-video">
          <video ref={videoRef} className={`user-stream-video-item ${ streamActive && 'stream-active'}`} src="/Videos/Stream1.mp4" autoPlay={true} loop={true}></video>
          
        </div>
        {!streamActive &&
          <UserStreamStart startStream={startStream}></UserStreamStart>
        }
        {streamActive &&
          <div onClick={stopStreaming} className="user-stream-video-stop">Stop Recording</div>
        }
      
      </div>
      {streamActive &&
        <>
          <ChatBox chat={messages}></ChatBox>
        </>
      }
      <div ref={promptRef} className="user-prompt">
        {streamActive && information &&
          <a href={`/Stream/${information.username}`} target="_blank" rel="noopener noreferrer">
            Stream is Live, Click Here
          </a>
        }
      </div>
 
    </>
  )
}

import React from 'react'
import NavBarDark from '../Components/NavBarDark'
import { Link } from 'react-router-dom'
import Streams from '../Json/Streams.json'


export default function Home() {
  return (
    <>
    <NavBarDark></NavBarDark>
    <div className="home-container">

      <div className="home-title-container">
        <div className="home-title">Welcome to Rythmix</div>
        <div className="home-subtitle">The World's Best Streaming Platform!</div>
      </div>
      <div className="home-section-container">
        <div className="home-section-left">
          <div className="home-section-left-title">About our Streaming Platform</div>
          <div className="home-section-left-description">Rhytmix is an innovative streaming platform specifically tailored for small-scale live streams. Leveraging the power of WebRTC technology, Rhytmix ensures seamless and high-quality video transmission, creating an immersive experience for both streamers and viewers. The platform's design caters to the needs of smaller content creators, offering a user-friendly interface and simplified setup processes.</div>
          <div className="home-section-left-bullet-point-container">
            <div className="home-section-left-bullet-point"></div> 
            <div className="home-section-left-bullet-point-text">WebRTC</div>  
          </div>    
          <div className="home-section-left-bullet-point-container">
            <div className="home-section-left-bullet-point"></div> 
            <div className="home-section-left-bullet-point-text"> Real-time Chatting</div>  
          </div>    
          <div className="home-section-left-bullet-point-container">
            <div className="home-section-left-bullet-point"></div> 
            <div className="home-section-left-bullet-point-text">WebCam and Screen Sharing</div>  
          </div>          
          {/* <div className="home-section-left-features">
            <div className="home-section-left-feature">feature1</div>
            <div className="home-section-left-feature">feature2</div>
            <div className="home-section-left-feature">feature3</div>
            <div className="home-section-left-feature">feature4</div>
            <div className="home-section-left-feature">feature5</div>
          </div> */}
          <div className="home-section-button">
          <Link to={'/User'}>
            <div>
          Get Started
            </div>
          </Link>
          </div>
        </div>
        <Link to={`/Stream/${encodeURIComponent(Streams.streams[0].author)}`}>
          <div className="home-section-main-stream">
            <video src="/Videos/Stream1.mp4" autoPlay={true} loop={true}></video>
          </div>
        </Link>
        <div className="home-section-right">
          <Link to={`/Stream/${encodeURIComponent(Streams.streams[2].author)}`}>
            <video src="/Videos/Stream3.mp4" autoPlay={true} loop={true}></video>
          </Link>
          <div className="home-section-right-title">Explore</div>
          <div className="home-section-right-description">Discover the world of online streaming and find new communities</div>
          <Link to={`/Explore`}>
            <div className="home-section-right-image">
              <img src="/Svg/RightArrow.svg" alt="" />
            </div>
          </Link>
        </div>

      </div>
    </div>

    </>
  )
}

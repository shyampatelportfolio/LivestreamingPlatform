import React, { useRef } from 'react'
import Streams from '../Json/Streams.json'
import { Link } from 'react-router-dom'
export default function ExploreVideoSideItem({item}) {
    const videoRef = useRef()
    function handleMouseEnter(){
        videoRef.current.play()
    }
    function handleMouseLeave(){
        videoRef.current.pause();
        videoRef.current.currentTime = 0;

    }
  return (

    <div className="explore-video-side">
        <div className="explore-video-side-right">
            <Link to={`/Stream/${encodeURIComponent(Streams.streams[item].author)}`}>

            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="explore-video-side-video-container">
                <video ref={videoRef} src={`/Videos/Stream${Streams.streams[item].id}.mp4`} autoPlay={false} loop={true}></video>
            </div>
            </Link>
        </div>
        <div className="explore-video-side-left">
            <div className="explore-video-side-category">{Streams.streams[item].author}</div>
            <div className="explore-video-side-title">{Streams.streams[item].name}
            </div>
            <div className="explore-video-side-details-information">
                <div className="explore-video-side-details-live-container">
                    <div className="explore-video-side-details-live-circle"></div>
                    <div className="explore-video-side-details-live-text">Live</div>
                </div>
               
            </div>
            <div className="explore-video-side-description">{Streams.streams[item].description}</div>
        </div>
    </div>
             
  )
}

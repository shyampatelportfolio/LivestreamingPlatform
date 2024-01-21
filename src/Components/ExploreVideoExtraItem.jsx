import React, { useRef } from 'react'
import Streams from '../Json/Streams.json'
import { Link } from 'react-router-dom';

export default function ExploreVideoExtraItem({item}) {
    const videoRef = useRef()
    function handleMouseEnter(){
        videoRef.current.play()
    }
    function handleMouseLeave(){
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
 
  return (
    <div className="explore-video-extra-item">
        <div className="explore-video-extra-item-right">
            <Link to={`/Stream/${encodeURIComponent(Streams.streams[item].author)}`}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="explore-video-extra-item-image">
                <video ref={videoRef} src={`/Videos/Stream${Streams.streams[item].id}.mp4`} autoPlay={false} loop={true}></video>
            </div>
            </Link>
            <div className="explore-video-extra-item-information">
                    <div className="explore-video-extra-item-live-container">
                        <div className="explore-video-extra-item-live-circle"></div>
                        <div className="explore-video-extra-item-live-text">Live</div>
                    </div>
            </div>
        </div>
        <div className="explore-video-extra-item-left">
            <div className="explore-video-extra-item-category">{Streams.streams[item].author}</div>
            <div className="explore-video-extra-item-title">{Streams.streams[item].name}
            </div>
            <div className="explore-video-extra-item-description">{Streams.streams[item].description}</div>
        </div>
    </div>
  )
}

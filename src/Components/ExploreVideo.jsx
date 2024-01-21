import React from 'react'
import ExploreVideoSideItem from './ExploreVideoSideItem'
import { Link } from 'react-router-dom'
import Streams from '../Json/Streams.json'
export default function ExploreVideo() {
  return (
        <div className="explore-video">

          <Link to={`/Stream/${encodeURIComponent(Streams.streams[0].author)}`}>
            <div className="explore-video-details">
              <div className="explore-video-details-author">Tenshin Hisokama</div>
              <div className="explore-video-details-title">Tokyo Rush Hour</div>
              <div className="explore-video-details-information">

                <div className="explore-video-details-live-container">
                  <div className="explore-video-details-live-circle"></div>
                  <div className="explore-video-details-live-text">Live</div>
                </div>
              </div>
              <div className="explore-video-details-description">Step into the heart of Tokyo's bustling metropolis with our livestream as we capture the electrifying energy of the city's rush hour. Watch the vibrant sea of commuters navigating through the iconic Shibuya Crossing, feel the pulse of the urban rhythm as trains arrive and depart seamlessly, and immerse yourself in the kaleidoscope of neon lights that define Tokyo's skyline. Join us for a front-row seat to the captivating spectacle of Tokyo's rush hour, where tradition meets modernity in a symphony of movement and color.</div>
            </div>
          </Link>
          <video src="/Videos/Stream1.mp4" autoPlay={true} loop={true}></video>
          {/* <div className="explore-video-overlay"></div> */}
          <div className="explore-video-side-container">
            <div className="explore-video-side-container-title">Top Streams</div>
            <ExploreVideoSideItem item={1}></ExploreVideoSideItem>
            <ExploreVideoSideItem item={2}></ExploreVideoSideItem>
            <ExploreVideoSideItem item={3}></ExploreVideoSideItem>

          </div>
        </div>  
  )
}

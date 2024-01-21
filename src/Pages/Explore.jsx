import React from 'react'
import ExploreVideo from '../Components/ExploreVideo'
import ExploreVideoExtra from '../Components/ExploreVideoExtra'
import Navbar from '../Components/Navbar'

export default function Explore() {
  return (
    <>
        {/* <div className="categories-container">
          <div className="categories-title">Categories</div>
        </div> */}
        <Navbar></Navbar>
        <ExploreVideo></ExploreVideo>
        <ExploreVideoExtra></ExploreVideoExtra>
    
    </>
  )
}

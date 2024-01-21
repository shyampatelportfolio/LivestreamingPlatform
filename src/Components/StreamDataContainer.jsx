import React from 'react'

export default function StreamDataContainer({metaData, id}) {


  function getViewers(viewers){
    if(viewers == 1){
      return '1 Viewer'
    }else{
      return `${viewers} Viewers`
    }
  }
  return (
    <div className="stream-video-data-details">
        <div className="stream-video-data-details-author">{id}</div>
        <div className="stream-video-data-details-title">{metaData.streamName}</div>
        <div className="stream-video-data-details-information">
        {metaData.streamLive? 
          <>
            <div className="stream-video-data-details-live-container">
              <div className="stream-video-data-details-live-circle"></div>
              <div className="stream-video-data-details-live-text">Live</div>
            </div>
          </> :
          <>
            <div className="stream-video-data-details-offline-container">
                <div className="stream-video-data-details-offline-text">Offline</div>
            </div>
          </>
        }
        <div className="stream-video-data-details-viewers-container">
          <div className="stream-video-data-details-viewers-text">{getViewers(metaData.totalViewers)}</div>
        </div>
        </div>
        <div className="stream-video-data-details-description">{metaData.streamDescription}</div>
    </div>
  )
}

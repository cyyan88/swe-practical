import React from 'react'
import { render } from 'react-dom'

function Tracks (props) {
  // const data = props.data

  const tracks = props.tracks
  if (JSON.stringify(tracks) != '{}' && JSON.stringify(tracks) != 'undefined') {
    const trackDisplay = tracks.map(track => 
      <a href={track.track.external_urls.spotify} target="_blank"><p>{track.track.name}</p></a>
    )
    return (
      <div className='tracks'>
        {trackDisplay}
      </div>
    )
  } else {
    return (<div>stats not available</div>)
  }
}

export default Tracks

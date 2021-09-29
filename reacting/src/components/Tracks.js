import React from 'react'
import TrackInfo from './TrackInfo'

function Tracks (props) {
  const tracks = props.tracks
  if (JSON.stringify(tracks) != '{}' && JSON.stringify(tracks) != 'undefined') {
    const trackDisplay = tracks.map(track =>
      <a href={track.track.external_urls.spotify} target='_blank'><p>{track.track.name}</p></a>
    )
    return (
      <div className='tracks'>
        <h3>Playlist Tracks</h3>
        {trackDisplay}
        <TrackInfo />
      </div>
    )
  } else {
    return (<div>Tracks not available</div>)
  }
}

export default Tracks

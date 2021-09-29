import React, { useState } from 'react'
import info from './info'

function StatsInfo () {
  const [statInfo, setInfo] = useState('')

  function showInfo (key) {
    setInfo(info[key])
    // console.log(key)
  }

  const infoDisplay = Object.keys(info).map(stat =>
    <a onClick={() => showInfo(stat)}><p>{stat}</p></a>
  )

  return (
    <div className='statsInfo'>
      <h3>Playlist Stats Details</h3>
      <p>Taken from <a href='https://developer.spotify.com/documentation/web-api/reference/#object-audiofeaturesobject' target='_blank'>Spotify's Web API Reference</a></p>
      <div className='statsDetails'>
        <div className='infoDisplay'>
          {infoDisplay}
        </div>
        <p>{statInfo}</p>
      </div>
    </div>

  )
}

export default StatsInfo

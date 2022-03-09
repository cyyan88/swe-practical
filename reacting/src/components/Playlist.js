import React from 'react'
import { render } from 'react-dom'

function Playlist (props) {
  const data = props.data
  if (data.error) { return (<div>Invalid playlist link</div>) } else if (JSON.stringify(data) !== '{}' && JSON.stringify(data) !== 'undefined') {
    return (
      <div className='playlist'>
        <img id='playlistImg' src={data.images[0].url} />
        <div className='info'>
          <a href={data.external_urls.spotify} target='_blank'><h1>{data.name}</h1></a>
          <h3>{data.description}</h3>
          <a href={data.owner.external_urls.spotify} target='_blank'><h2>{data.owner.display_name}</h2></a>
        </div>
      </div>
    )
  } else {
    return (<div>Playlist not available</div>)
  }
}

export default Playlist

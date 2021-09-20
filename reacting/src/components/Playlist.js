import React from 'react'
import { render } from 'react-dom'

function Playlist (props) {
  const data = props.data
  // console.log(data)
  if (JSON.stringify(data) != '{}' && JSON.stringify(data) != 'undefined') {
    return (
      <div className='playlist'>
        <img src={data.images[1].url} />
        <a href={data.external_urls.spotify} target='_blank'><h1>{data.name}</h1></a>
        <a href={data.owner.external_urls.spotify} target='_blank'><h2>{data.owner.display_name}</h2></a>
      </div>
    )
  } else {
    return (<div>loading...</div>)
  }
}

export default Playlist

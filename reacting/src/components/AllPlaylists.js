import React from 'react'
import { render } from 'react-dom'

const AllPlaylists = props => {
  const data = props.data
  
  if (data.error) { return (<div>Invalid playlist link</div>) } 
  else if (data.items && JSON.stringify(data) !== '{}' && JSON.stringify(data) !== 'undefined') {
    const list = data.items.map((pl) =>
    <a href={pl.external_urls.spotify} target="_blank" rel="noreferrer"><p key={pl.id}>{pl.name}</p></a>
    )
    return (
      <div className='allPlaylists'>
        {list}
      </div>
    )
  } else {
    return (<div>Playlists not available</div>)
  }
}

export default AllPlaylists

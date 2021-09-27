import React from 'react'
import { render } from 'react-dom'

function Stats (props) {
  // const data = props.data

  const stats = props.stats
  let len = 1
  if(JSON.stringify(props.len) != '{}' && JSON.stringify(props.len) != 'undefined'){
    len = props.len.tracks.items.length
  }
  if (JSON.stringify(stats) != '{}' && JSON.stringify(stats) != 'undefined') {
    const statDisplay = Object.keys(stats).map(key =>
     <p>{`${key}: ${(stats[key]/len).toFixed(3)}`}</p>
    )
    return (
      <div className='stats'>
        <div>
          <h3>Average Stats</h3>
          <p>Length: {len}</p>
          {statDisplay}</div>
      </div>
    )
  } else {
    return (<div>stats not available</div>)
  }
}

export default Stats

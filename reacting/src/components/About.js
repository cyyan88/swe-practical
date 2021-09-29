import React from 'react'
import StatsInfo from './StatsInfo'

function About () {
  return (
    <div className='about'>
      <h4>We promise not to store your personal information or use it maliciously! As of now we do not know how 🥰</h4>
      <h4>This app requires cookies (store your access token) 🍪</h4>
      <h4>Made using Spotify and <a href='https://developer.spotify.com/documentation/web-api/' target='_blank'>Spotify's Web API</a> 💖</h4>
      <StatsInfo />
    </div>
  )
}

export default About

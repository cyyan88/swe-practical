import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import Playlist from './Playlist'
import Stats from './Stats'
import Tracks from './Tracks'
import Login from './Login'

const Spotify = props => {

  const [token, setToken] =useState(Cookies.get('spotifyAuthToken'))
  const [trackData, setTrackData] = useState({})
  const [allTracks, setAllTracks] = useState({})
  const [playlistData, setPlaylist] = useState({})


  const defaultStats = {
    acousticness: 0,
    danceability: 0,
    duration_ms: 0,
    energy: 0,
    instrumentalness: 0,
    liveness: 0,
    loudness: 0,
    speechiness: 0,
    tempo: 0,
    valence: 0
  }
  const [stats, setStats] = useState(defaultStats)
  const [playlistId, setPlaylistId] = useState(Cookies.get('playlistId'))
  const [link, setLink] = useState('https://open.spotify.com/playlist/37i9dQZF1DZ06evO4kAIIU?si=937547c672cd4b9b')


  const updateStats = track => {
    let newStats = stats
    Object.keys(track).forEach(s => {
      if (s in stats) {
        const prev = track[s]
        newStats[s] = newStats[s] + prev
      }})
    setStats(newStats)
  }

  const fetchAPI = (link, type) => {
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
    fetch(link, {
      method: 'GET',
      headers: header
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) alert('Invalid playlist link 🤧')
        else if (type === 'track') {
          updateStats(data)
        } 
        else if (type === 'playlist') {
          console.log(data)
          setPlaylist(data) 
          Cookies.set('playlistData', JSON.stringify(data))
          setAllTracks(data.tracks.items)
          setStats(defaultStats)
          plTracks(data.tracks)
        }
      })
      .catch(err => console.log(err))
  }

  const getPlaylist = id => {
    fetchAPI(`https://api.spotify.com/v1/playlists/${id}`, 'playlist')
  }

  const getTrack = id => {
    fetchAPI(`https://api.spotify.com/v1/audio-features/${id}`, 'track')
  }

  const plTracks = tracks => {
    tracks.items.forEach(t => {
      getTrack(t.track.id)
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const end = link.indexOf('?si') != -1 ? link.indexOf('?si'): link.length
    const id = link.substring(link.indexOf('playlist/') + 9, end)
    setPlaylistId(id)
    Cookies.set('playlistId', id)
    console.log(Cookies.get('playlistId'))
    getPlaylist(id)
  }

  const handleChange = event => {
    setLink(event.target.value)
  }

  useEffect(() => {
    if(Cookies.get('playlistData')){
      setPlaylist(JSON.parse(Cookies.get('playlistData')))
    }
    if (token && JSON.stringify(playlistData) === '{}') {
      console.log('getting playlist')
    //if(token){ && JSON.stringify(playlistData) === undefined){
      if (playlistId !== undefined) getPlaylist(playlistId)
      else getPlaylist('37i9dQZF1DZ06evO4kAIIU')
    }
  }, [])

  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <div className='display'>
            <div className='linkForm'>
              <form id='linkForm' onSubmit={handleSubmit}>
                <h4>✨Playlist Link✨</h4>
                <input type='text' name='link' value={link} onChange={handleChange} />
                <input type='submit' value='Submit' />
              </form>
            </div>
            <Playlist data={playlistData} />
            <Stats stats={stats} len={playlistData} />
            <Tracks tracks={allTracks} />
          </div>
        </SpotifyApiContext.Provider>
      ) : (
        <div>
          <Login />
          <SpotifyAuth
            // redirectUri='https://statlistfy.netlify.app/'
            redirectUri='http://localhost:3000/callback'
            clientID='829c9df647804f28b37c2388cf43e2b7'
            scopes={[Scopes.userReadPrivate, 'user-read-email']}
          />
        </div>
      )}
    </div>
  )
  
}

export default Spotify

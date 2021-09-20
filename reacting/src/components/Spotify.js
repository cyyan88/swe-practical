import React, { Component, useState, useEffect } from 'react'
// import axios from 'axios'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import Playlist from './Playlist'
import Stats from './Stats'
import Tracks from './Tracks'

class Spotify extends React.Component {
  // const [token] = useState(Cookies.get('spotifyAuthToken'))
  // const [trackData, setTrack] = useState({})
  // const [userData, setUserData] = useState({})
  // const [playlistData, setPlaylist] = useState({})

  constructor () {
    super()  
    this.state = {
      token: Cookies.get('spotifyAuthToken'),
      trackData: {},
      allTracks: {},
      userData: {},
      playlistData: {},
      stats: {
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
      },
      avgStats: {
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
    }
    this.fetchAPI = this.fetchAPI.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.fetchAPI = this.fetchAPI.bind(this)
  }

  updateStats (track) {
    this.setState((prev) => {
      const newStats = prev.stats
      Object.keys(track).forEach(s => {
        if (prev.stats[s] != null) {
          newStats[s] = prev.stats[s] + track[s]
        }
      })
      return {
        stats: newStats
      }
    })
  }

  fetchAPI (link, type) {
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.state.token}`
    }
    fetch(link, {
      method: 'GET',
      headers: header
    })
      .then(response => response.json())
      .then(data => {
        // console.log(type)
        if (type == 'track') {
          this.updateStats(data)
          //console.log(this.state.stats)


        } else if (type == 'userPlaylists') { this.setState({ userData: data }) } else if (type == 'playlist') {
          this.setState({ playlistData: data })
          // console.log(data.tracks.items)
          // this.setState({allTracks: data.tracks.items})
          this.plTracks(data.tracks)
        }
      })
  }

  getUserPlaylists () {
    this.fetchAPI('https://api.spotify.com/v1/users/glisteningpandas/playlists', 'userPlaylists')
  }

  getPlaylist () {
    this.fetchAPI('https://api.spotify.com/v1/playlists/0R9NxaAIIocYDoM4lZmJlI', 'playlist')
  }

  componentDidMount () {
    if (this.state.token && JSON.stringify(this.state.playlistData) == '{}') { this.getPlaylist() }
  }

  getTrack (id) {
    // console.log(this.state.playlistData)
    this.fetchAPI(`https://api.spotify.com/v1/audio-features/${id}`, 'track')
  }

  plTracks (tracks) {
    tracks.items.forEach(t => {
      this.getTrack(t.track.id)
    })

  }

  render () {
    return (
      <div className='app'>
        {this.state.token ? (
          <SpotifyApiContext.Provider value={this.state.token}>
            {/* Your Spotify Code here */}
            <p>You are authorized with token: {this.state.token}</p>
          </SpotifyApiContext.Provider>
        ) : (
        // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='829c9df647804f28b37c2388cf43e2b7'
            scopes={[Scopes.userReadPrivate, 'user-read-email']}
          />
        )}

        <Playlist data={this.state.playlistData} stats={this.state.stats} />
        <Stats />
        <Tracks />
      </div>
    )
  }
}

export default Spotify

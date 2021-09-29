import React, { Component, useState, useEffect } from 'react'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import Playlist from './Playlist'
import Stats from './Stats'
import Tracks from './Tracks'
import Login from './Login'
import About from './About'

class Spotify extends React.Component {
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
      playlistId: Cookies.get('playlistId'),
      link: 'https://open.spotify.com/playlist/37i9dQZF1DZ06evO4kAIIU?si=937547c672cd4b9b'
    }
    this.fetchAPI = this.fetchAPI.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateStats (track) {
    this.setState((prev) => {
      const newStats = prev.stats
      Object.keys(track).forEach(s => {
        if (newStats[s] != null) {
          const prev = newStats[s]
          newStats[s] = track[s] + prev
        }
      })
      return {
        stats: { ...newStats }
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
        if (data.error) alert('Invalid playlist link 🤧')
        else if (type == 'track') {
          this.updateStats(data)
        } else if (type == 'userPlaylists') { this.setState({ userData: data }) } else if (type == 'playlist') {
          this.setState({ playlistData: { ...data } })
          this.setState({ allTracks: data.tracks.items })
          this.setState({
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
            }
          })
          this.plTracks(data.tracks)
        }
      })
  }

  getUserPlaylists () {
    this.fetchAPI('https://api.spotify.com/v1/users/glisteningpandas/playlists', 'userPlaylists')
  }

  getPlaylist (id) {
    this.fetchAPI(`https://api.spotify.com/v1/playlists/${id}`, 'playlist')
  }

  componentDidMount () {
    if (this.state.token && JSON.stringify(this.state.playlistData) == '{}') {
      if (this.state.playlistId != '') this.getPlaylist(this.state.playlistId)
      else this.getPlaylist('37i9dQZF1DZ06evO4kAIIU')
    }
  }

  getTrack (id) {
    this.fetchAPI(`https://api.spotify.com/v1/audio-features/${id}`, 'track')
  }

  plTracks (tracks) {
    tracks.items.forEach(t => {
      this.getTrack(t.track.id)
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    const id = this.state.link.substring(this.state.link.indexOf('playlist/') + 9, this.state.link.indexOf('?si'))
    this.setState({ playlistId: { id } })
    Cookies.set('playlistId', id)
    this.getPlaylist(id)
  }

  handleChange (event) {
    this.setState({ link: event.target.value })
  }

  render () {
    return (
      <div className='app'>
        {this.state.token ? (
          <SpotifyApiContext.Provider value={this.state.token}>
            <div className='display'>

              <div>
                <form id='linkForm' onSubmit={this.handleSubmit}>
                  <p>Submit a link to your playlist!</p>
                  <input type='text' name='link' value={this.state.link} onChange={this.handleChange} />
                  <input type='submit' value='Submit' />
                </form>
              </div>

              <Playlist data={this.state.playlistData} />
              <Stats stats={this.state.stats} len={this.state.playlistData} />
              <Tracks tracks={this.state.allTracks} />
            </div>
          </SpotifyApiContext.Provider>

        ) : (
          <div>
            <Login />
            <SpotifyAuth
              redirectUri='https://statlistfy.netlify.app/'
              // redirectUri='http://localhost:3000/callback'
              clientID='829c9df647804f28b37c2388cf43e2b7'
              scopes={[Scopes.userReadPrivate, 'user-read-email']}
            />
          </div>
        )}

      </div>
    )
  }
}

export default Spotify

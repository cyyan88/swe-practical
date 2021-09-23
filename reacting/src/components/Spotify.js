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
      link: "https://open.spotify.com/playlist/0R9NxaAIIocYDoM4lZmJlI?si=68bbfad72eae49cf"
    }
    this.fetchAPI = this.fetchAPI.bind(this)
    this.updateStats = this.updateStats.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  updateStats (track) {
    this.setState((prev) => {
      let newStats = prev.stats
      Object.keys(track).forEach(s => {
        if (newStats[s] != null) {
          const prev = newStats[s]
          newStats[s] = track[s] + prev
        }
      })
      return {
        stats: {...newStats}
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
        if(data.error) console.log('whoops')
        else if (type == 'track') {
          this.updateStats(data)
        } 
        else if (type == 'userPlaylists') { this.setState({ userData: data }) } else if (type == 'playlist') {
          console.log(link)
          console.log(data)
          this.setState({ playlistData: {...data} })
          this.setState({allTracks: data.tracks.items})
          this.setState({stats: {acousticness: 0,
            danceability: 0,
            duration_ms: 0,
            energy: 0,
            instrumentalness: 0,
            liveness: 0,
            loudness: 0,
            speechiness: 0,
            tempo: 0,
            valence: 0}})
          this.plTracks(data.tracks)
        }
      })
  }

  getUserPlaylists () {
    this.fetchAPI('https://api.spotify.com/v1/users/glisteningpandas/playlists', 'userPlaylists')
  }

  getPlaylist (id) {
    console.log(id)
    this.fetchAPI(`https://api.spotify.com/v1/playlists/${id}`, 'playlist')
  }

  componentDidMount () {
    if (this.state.token && JSON.stringify(this.state.playlistData) == '{}') { this.getPlaylist("0R9NxaAIIocYDoM4lZmJlI") }
  }

  getTrack (id) {
    this.fetchAPI(`https://api.spotify.com/v1/audio-features/${id}`, 'track')
  }

  plTracks (tracks) {
    tracks.items.forEach(t => {
      this.getTrack(t.track.id)
    })
  }

  handleSubmit(event){
    event.preventDefault()
    //console.log(event.target.value)
    // this.setState({
    //   link: event.target.value
    // })
  
    let id = this.state.link.substring(this.state.link.indexOf("playlist/") + 9, this.state.link.indexOf("?si"))
    this.getPlaylist(id)
  }

  handleChange(event) {
    console.log(this.state.link)
    this.setState({link: event.target.value});
  }


  render () {
    return (
      <div className='app'>
        {this.state.token ? (
          <SpotifyApiContext.Provider value={this.state.token}>
            {/* Your Spotify Code here */}
            {/* <p>You are authorized with token: {this.state.token}</p> */}
            <div className="display">

        <form onSubmit={this.handleSubmit}>
          <input name="link" value={this.state.link} onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>

          <Playlist data={this.state.playlistData}  />
          <Stats stats={this.state.stats} len={this.state.playlistData}/>
          <Tracks tracks={this.state.allTracks}/>
        </div>
          </SpotifyApiContext.Provider>
          
        ) : (
        // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='829c9df647804f28b37c2388cf43e2b7'
            scopes={[Scopes.userReadPrivate, 'user-read-email']}
          />
        )}

        
      </div>
    )
  }
}

export default Spotify

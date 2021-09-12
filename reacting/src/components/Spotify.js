import React, {useState, useEffect} from 'react'
//import axios from 'axios'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import Playlist from './Playlist'
import Stats from './Stats'
import Tracks from './Tracks'


function Spotify() {

    const [token] = useState(Cookies.get('spotifyAuthToken'))
    const [trackData, setTrack] = useState({})
    const [userData, setUserData] = useState({})
    const [playlistData, setPlaylist] = useState({})

    useEffect(() => {
        if(token){
            getPlaylist()
        }
    }, [])

    function getUserPlaylists(){
      fetchAPI('https://api.spotify.com/v1/users/glisteningpandas/playlists', 'userPlaylists')
    }

    function getPlaylist(){
      fetchAPI('https://api.spotify.com/v1/playlists/0R9NxaAIIocYDoM4lZmJlI', 'playlist')
    }

    function getTrack(){
        fetchAPI('https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT', 'track')
    }

    function fetchAPI(link, type){
      const header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      fetch(link, {
          method: 'GET',
          headers: header
      })
          .then(response => response.json())
          .then(data => {
            switch(type){
              case 'track':
                setTrack(data)
                break
              case 'userPlaylists':
                setUserData(data)
              case 'playlist':
                setPlaylist(data)
              default:
                console.log(data)
            }            
          })
    }

    return(
      <div className='app'>
        {token ? (
          <SpotifyApiContext.Provider value={token}>
            {/* Your Spotify Code here */}
            <p>You are authorized with token: {token}</p>
          </SpotifyApiContext.Provider>
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='829c9df647804f28b37c2388cf43e2b7'
            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          />
        )}

        <Playlist data={playlistData}/>
        <Stats />
        <Tracks />   
      </div>
    )
    
}

    


export default Spotify



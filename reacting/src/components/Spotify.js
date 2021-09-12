import React, {useState, useEffect} from 'react'
//import axios from 'axios'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

function Spotify() {

//   constructor() {
//     super()
//     this.state = {
//         loading: false,
//         character: 'hello'
//     }
//     }


    const [token] = useState(Cookies.get('spotifyAuthToken'))
    
    useEffect(() => {
        if(token){
            getPlaylist()
        }
    })

    function getPlaylist(){
        console.log("hello")
        console.log(token)
        const header = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        fetch('https://api.spotify.com/v1/audio-features/06AKEBrKUckW0KREUWRnvT', {
            method: 'GET',
            //mode: 'no-cors',
            headers: header
        })
            .then(response => response.json())
            .then(data => console.log(data))
        
    }

    return(

    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider onLoad={getPlaylist} value={token}>
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
    </div>

    )
  }

    


export default Spotify



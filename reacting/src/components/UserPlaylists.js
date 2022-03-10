import React, { useState, useEffect } from 'react'
import 'react-spotify-auth/dist/index.css'
import Cookies from 'js-cookie'
import AllPlaylists from './AllPlaylists'

const UserPlaylists = props => {

    const [token, setToken] = useState(Cookies.get('spotifyAuthToken'))
    const [userData, setData] = useState([])

    useEffect(() => {
        setToken(Cookies.get('spotifyAuthToken'))
        fetchAPI()
    }, [])

    const fetchAPI = () => {
        const link = 'https://api.spotify.com/v1/me/playlists'
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
                setData(data)
            })
    }
    
    return(
        <div className="UserPlaylists">
            {!token ? (
                <p>Please <a href="/">login</a> first.</p>
            ): 
            (
                <div>
                    <h2>My Public Playlists</h2>
                    <AllPlaylists data={userData}/>
                </div>
            )
            }

        </div>
    )
    
}

export default UserPlaylists

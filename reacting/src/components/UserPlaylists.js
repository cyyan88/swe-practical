import React, { useState, useEffect, useContext } from 'react'
import 'react-spotify-auth/dist/index.css'
import Context from "../Context"
import Cookies from 'js-cookie'

const UserPlaylists = props => {

    //console.log('exists??')
         
    //const {context, dispatch} = useContext(Context);
    const [token, setToken] = useState(Cookies.get('spotifyAuthToken')); //useState(context.token);
    const [userData, setData] = useState([]);

    useEffect(() => {
        setToken(Cookies.get('spotifyAuthToken'))
        fetchAPI()
    }, [])

    const fetchAPI = () => {
        //const link = 'https://api.spotify.com/v1/users/glisteningpandas/playlists'
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
                console.log(data)
                setData(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return(
        <div className="UserPlaylists">
            <h1>test...</h1>
        </div>
    )
    
}

export default UserPlaylists
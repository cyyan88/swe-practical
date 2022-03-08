import React, { useState, useEffect, useContext } from 'react'
import 'react-spotify-auth/dist/index.css'
import { Context } from "../Context";

const UserPlaylists = props => {

    console.log('exists??')
         
    const {context, dispatch} = useContext(Context);
    const [token, setToken] = useState(context.token);
    const [userData, setData] = useState([]);

    useEffect(() => {
        console.log('user playlists...')
        fetchAPI()
    }, [])

    const fetchAPI = () => {
        const link = 'https://api.spotify.com/v1/users/glisteningpandas/playlists'
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
        <div>
            <h1>test...</h1>
        </div>
    )
    
}

export default UserPlaylists

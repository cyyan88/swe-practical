import {React, Component} from 'react'
import axios from 'axios'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // if using the included styles


class Spotify extends Component {

//   constructor() {
//     super()
//     this.state = {
//         loading: false,
//         character: 'hello'
//     }
//     }


  render (){
    return(
        <SpotifyAuth
        redirectUri='http://localhost:3000/callback'
        clientID='829c9df647804f28b37c2388cf43e2b7'
        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
      />
    )
  }

//   componentDidMount() {
//     this.setState({loading: true})
//     fetch("https://swapi.dev/api/people/4/")
//         .then(response => response.json())
//         .then(data => {
//             this.setState({
//                 loading: false,
//                 character: data
//             })
//         })
//   }

  spotifyAPI(){
    const client_id = '829c9df647804f28b37c2388cf43e2b7' 
    const client_secret = '1f4021bc4e574d7099a6f787ccf17466'
    const redirect_uri = 'http://localhost:3000/callback'
    fetch('http://example.com/movies.json')
    .then(response => response.json())
    .then(data => console.log(data))
  }
    
}

export default Spotify

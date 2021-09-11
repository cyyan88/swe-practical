import {React, Component} from 'react'
import Genius from 'genius-api'
const accessToken = 'Tp_wXKpqqdlAfzZ9Fj_ql11TZk4Gc7_bPHxS7nQ4lCSa0tTqL75lRIRZFkrE2xf3'
const genius = new Genius(accessToken)

class App extends Component {

  constructor() {
    super()
    this.state = {
        loading: false,
        character: 'hello'
    }
}


  render (){
    Genius.prototype.getArtistIdByName = function getArtistIdByName(artistName) {
      const normalizeName = name => name.replace(/\./g, '').toLowerCase()   // regex removes dots
      const artistNameNormalized = normalizeName(artistName)
    
      return this.search(artistName)
        .then((response) => {
          for (let i = 0; i < response.hits.length; i += 1) {
            const hit = response.hits[i]
            if (hit.type === 'song' && normalizeName(hit.result.primary_artist.name) === artistNameNormalized) {
              return hit.result
            }
          }
          throw new Error(`Did not find any songs whose artist is "${artistNameNormalized}".`)
        })
        .then(songInfo => songInfo.primary_artist.id)
    }
    
    const genius = new Genius(accessToken)
    genius.getArtistIdByName('Drake')
    .then(artistId => { /* ... */ })
    .catch(err => console.error(err))
    
    return(
      <div className="App">
      <h1>hello</h1>
    </div>
    )
  }

  componentDidMount() {
    this.setState({loading: true})
    fetch("https://swapi.dev/api/people/4/")
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading: false,
                character: data
            })
        })
  }
    
}

export default App

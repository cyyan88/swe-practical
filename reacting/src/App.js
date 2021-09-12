import {React, Component} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import Spotify from './components/Spotify'

class App extends Component {

  constructor() {
    super()
    this.state = {
        loading: false,
        character: 'hello'
    }
}


  render (){

    return(
      <div className="App">
      <h1>hello</h1>
      <Spotify />
      <Button variant="primary">Primary</Button>{' '}
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

  // spotifyAPI(){
  //   fetch('http://example.com/movies.json')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }
    
}

export default App

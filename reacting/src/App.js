import { React, Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spotify from './components/Spotify'

class App extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      character: 'hello'
    }
  }

  render () {
    return (
      <div className='App'>
        <Spotify />
      </div>
    )
  }

  componentDidMount () {
    this.setState({ loading: true })
    fetch('https://swapi.dev/api/people/4/')
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

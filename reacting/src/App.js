import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spotify from './components/Spotify'
import About from './components/About'
import UserPlaylists from './components/UserPlaylists'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App () {
  return (
    <Router>
      <div className='app'>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/me'>My Playlists</Link>
        </nav>
        <Switch>
          <Route path='/about'><About /></Route>
          <Route path='/'><Spotify /></Route>
          <Route path='/me'><UserPlaylists /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

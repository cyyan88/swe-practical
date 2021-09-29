import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spotify from './components/Spotify'
import About from './components/About'
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
        </nav>
        <Switch>
          <Route path='/about'><About /></Route>
          <Route path='/'><Spotify /></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

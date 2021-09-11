import {React, Component} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const ACCESS_TOKEN = 'CsfADECm9bWsBConuB8CeeCPzM0xg-465U1ygw'

let data
const headers = {
  'User-Agent': 'CompuServe Classic/1.22',
  'Accept': 'application/json',
  'Host': 'api.genius.com',
  'Authorization': `Bearer ${ACCESS_TOKEN}`
  //"Access-Control-Allow-Origin": "*"
}
const getSong = async () => {
  //data= axios.get(`https://api.genius.com/search?q=Kendrick%20Lamar`, headers)
  data = axios.get('https://my-json-server.typicode.com/nfried16/swe-practice/weather')
  console.log(data)
  
  //console.log('getweather')
}
getSong()

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
    
}

export default App

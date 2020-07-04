import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Clarifai from 'clarifai';

const app = new Clarifai(
  {api_key:"688733658fb344be817803c1c710246a"});

const particleOptions = {
  particles: {
      number: {
        value: 50,
        density:{
          enable: true,
          value_area: 800
        }
      }
    }
  }


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {

    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      // do something with response
    },
    function(err) {
      // there was an error
    }
    );
  }
  render(){

    return(
      <div className="App">
          <Particles className="particles"
          params= {particleOptions}
          />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      </div>
    );
  }
}

export default App;

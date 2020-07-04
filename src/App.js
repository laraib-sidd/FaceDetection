import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai';

const app = new Clarifai.App(
  {apiKey:"688733658fb344be817803c1c710246a"});

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
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.COLOR_MODEL,
     "https://samples.clarifai.com/face-det.jpg")
     .then(function(response) {
        // do something with response
        console.log(response);
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
          <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

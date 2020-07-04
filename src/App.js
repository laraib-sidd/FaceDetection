import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
class App extends Component {
  render(){
    return(
      <div className="App">
		<Navigation />
		<Logo />
    <Rank />
    <ImageLinkForm />
      </div>
    );
  }
}
export default App;

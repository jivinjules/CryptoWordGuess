import React, { Component } from 'react';
import './App.css';
import Clipboard from 'react-clipboard.js';
import Confetti from './Components/Confetti'
import ReactTooltip from 'react-tooltip'
import './App.css';
import Jumbtron from './Components/Jumbotron/Jumbotron'
import Wrapper from './Components/Wrapper/Wrapper'

const QRCode = require('qrcode.react');

class App extends Component {
  state = {
    score: 0,
    topScore: 0,
  }
  render() {
    return (
      <Wrapper>
      <Jumbtron><span id="score"> Score: {this.state.score} </span>{"  "} <span id="topscore"> Top Score: {this.state.topScore}</span>{" "} </Jumbtron>
      </Wrapper>
    );
  }
}

export default App;

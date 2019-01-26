import React, { Component } from 'react';
import './App.css';
import Clipboard from 'react-clipboard.js';
import Confetti from './Components/Confetti'
import ReactTooltip from 'react-tooltip'
import './App.css';
import Jumbtron from './Components/Jumbotron/Jumbotron'
import Column from './Components/column'
import Row from './Components/row'
import Container from './Components/container'
import Wrapper from './Components/Wrapper/Wrapper'
import words from './wordList.json'
import ErrorModal from './Components/Modal/errorModal'
import WinModal from './Components/Modal/winModal'
import QRModal from './Components/Modal/QRModal'
import LoseModal from './Components/Modal/loseModal';
import API from './utils/API'

const QRCode = require('qrcode.react');
let wordArray = []
let blanksAndUnderscores = []
let chosenWord = ''
let lettersInChosenWord = []
let numberOfBlanks = 0
let wrongGuesses = []
let lettersGuessed = ''

class App extends Component {
  state = {
    image: '',
    words,
    winCount: 0,
    lossCount: 0,
    numberofGuesses: 10,
    show: false,
    showLightning: false,
    showWin: false,
    showQR: false,
    charge: '',
    showYes: true,
    amount: 0,
    charge_id: '',
    paid: false,
    exit: false,
    error: false
  }

  componentDidMount() {
    this.startGame()
    //   API.getStrike()
    //     .then(data => {
    //       this.setState({ charge: data.data.body.payment_request })
    //       this.setState({ amount: data.data.body.amount })
    //       this.setState({ charge_id: data.data.body.id })
    //     })
    //     .catch(err => console.log(err))
  }

  theWords = () => this.state.words.map(word => {
    wordArray.push(`${word.name}`)
    return wordArray
  })

  startGame = () => {
    document.addEventListener("keydown", this.handleClick);
    this.theWords()
    blanksAndUnderscores = []
     chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase()
    lettersInChosenWord = chosenWord.split("")
    numberOfBlanks = lettersInChosenWord.length
    wrongGuesses = []
    this.setState({
      numberofGuesses: 10
    })
    for (var i = 0; i < numberOfBlanks; i++) {
      blanksAndUnderscores.push(' _ ')
    }
  }

  checkLetter = (letter) => {
    var letterInWord = false;
    for (var i = 0; i < numberOfBlanks; i++) {
      if (chosenWord[i] === letter) {
        letterInWord = true;
      }
    }
    if (letterInWord) {
      for (var j = 0; j < numberOfBlanks; j++) {
        if (chosenWord[j] === letter) {
          blanksAndUnderscores[j] = letter;
          this.setState({ numberofGuesses: this.state.numberofGuesses  })
        }
      }

    } else {
      wrongGuesses.push(letter);
      this.setState({ numberofGuesses: this.state.numberofGuesses - 1 })
    }
  }

  roundComplete = () => {
    if (lettersInChosenWord.toString() === blanksAndUnderscores.toString()) {
      this.setState({ winCount: this.state.winCount + 1, showWin: true })
    } else if (this.state.numberofGuesses === 0) {
      this.setState({ lossCount: this.state.lossCount + 1, show: true })
    
    }
  }

  handleHideWin = () => this.setState({ showWin: false }, () => this.exitApp())

  handleHideModal = () => this.setState({ show: false, error: false }, () => this.componentDidMount())

  handleClick = (event) => {
    lettersGuessed = String.fromCharCode(event.which).toLowerCase();
    this.checkLetter(lettersGuessed);
    this.roundComplete();
  }

  exitApp = () => {
    this.componentDidMount()
    window.location.href = 'localhost:3000'
  }

  getText() {
    return "03a8355790b89f4d96963019eb9413b9a2c884691837ac976bacfe25a5212892d7@99.71.113.187:9735";
  }

  getQR = () => this.setState({ showQR: true, showYes: false })

  getPaymentRequest = () => {
    const charge = this.state.charge
    return charge
  }

  render() {
     console.log({chosenWord})
      return (
      <Wrapper>
        <Jumbtron><span id="score"> Wins: {this.state.winCount} </span>{"  "}<span id='image'>{this.state.image}</span> <span id="topscore"> Losses: {this.state.lossCount}</span>{" "} </Jumbtron>
        <Container>
          <Row>
            <Column className = 'full' size='md-12'>
              <h1>Your Word</h1>
              <h1 className='word'>{blanksAndUnderscores}</h1>
            </Column>
          </Row>
          <Row>
            <Column className='half' size='md-4'>
              <h1>Letters Already Guessed</h1>
              <h1 className='word'>{wrongGuesses}</h1>
            </Column>
            <Column size='md-4'>
              <span id='image'>{this.state.image}</span>

            </Column>
            <Column className='half' size='md-4'>
              <h1>Guesses Left</h1>
              <h1>{this.state.numberofGuesses}</h1>

            </Column>


            <ErrorModal
              show={this.state.error}
              handleClose={this.handleHideModal} />

            <LoseModal
              show={this.state.show}
              handleClose={this.handleHideModal}>{chosenWord}</LoseModal>

            <QRModal
              show={this.state.showLightning}
              showYes={this.state.showYes}
              getQR={this.getQR}
              showQR={this.state.showQR}
              paid={this.state.paid}
              exit={this.state.exit}
              chargePlayer={this.chargePlayer}
              exitApp={this.exitApp}>
              <QRCode value={this.state.charge}
                size={128}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"L"}
                includeMargin={false}
                renderAs={"svg"} />
              <Clipboard option-text={this.getPaymentRequest} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                Copy Payment Request</Clipboard><br />
              <ReactTooltip />
            </QRModal>

            <WinModal
              show={this.state.showWin}
              handleHideWin={this.handleHideWin}>
              <Confetti />
              <Clipboard option-text={this.getText} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                <i className="fas fa-paste"></i> Connection Code </Clipboard>
              <ReactTooltip />
            </WinModal>
          </Row>
        </Container>
      </Wrapper >
    );
  }
}

export default App;

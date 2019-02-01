import React, { Component } from 'react';
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

let wordArray = []
let blanksAndUnderscores = []
let chosenWord = ''
let lettersInChosenWord = []
let numberOfBlanks = 0
let wrongGuesses = []
let lettersGuessed = ''
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

class App extends Component {
  state = {
    words,
    image: '',
    winCount: 0,
    lossCount: 0,
    definition: "",
    numberofGuesses: 10,
    message: '',
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
    error: false,
    hint: false,
    button: true,
    hasPaid: false
  }

  componentDidMount() {
    this.startGame()
 }

  getQR = () => this.setState({ showQR: true, showYes: false })

  chargePlayer = () => {
    API.getConfirm(this.state.charge_id)
      .then(data => {
        if (data.data.body.paid === true) {
          this.setState({ showQR: false, exit: false, hasPaid: true })
          this.setState({ paid: true })
          setTimeout(function () {
            this.setState({ paid: false }, () => this.handleHideThis());
          }.bind(this), 3000);
        } else { this.setState({ exit: true, showQR: false }) }
      })
      .catch(err => {
        console.log(err)
        this.setState({ showQR: false })
        this.setState({ exit: true })
      })
  }

  theWords = () => this.state.words.map(word => {
    wordArray.push(`${word.name}`)
    return wordArray
  })

  getImageAndDef = (chosenWord) => this.state.words.map(word => {
    if (chosenWord === word.name.toLowerCase()) {
      this.setState({ image: word.image, definition: word.definition })
    }
  })

  showLightning = () => {
    if (this.state.charge === '') {
      this.setState({ error: true })
    } else { this.setState({ showLightning: true, showYes: true }) }
  }

  handleHideThis = () => this.setState({ showLightning: false })

  handleHideModal = () => this.setState({ show: false, error: false }, () => this.handleEndOfGame())

  handleHideWin = () => this.setState({ showWin: false }, () => this.exitApp())

  startGame = () => {
    API.getStrike()
      .then(data => {
        this.setState({ charge: data.data.body.payment_request })
        this.setState({ amount: data.data.body.amount })
        this.setState({ charge_id: data.data.body.id })
      })
      .catch(err => console.log(err))
    this.theWords()
    blanksAndUnderscores = []
    chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase()
    this.getImageAndDef(chosenWord)
    lettersInChosenWord = chosenWord.split("")
    numberOfBlanks = lettersInChosenWord.length
    wrongGuesses = []
    this.setState({
      numberofGuesses: 10,
      button: true,
      hint: false,
      showYes: false,
      showQR: false,
      showWin: false,
      showLightning: false,
      paid: false,
      exit: false,
      show: false,
      hasPaid: false
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
          this.setState({ numberofGuesses: this.state.numberofGuesses })
        }
      }
    }
    else if (wrongGuesses.indexOf(letter) >= 0) {
      this.setState({ message: "Already Chosen" })
      setTimeout(function () {
        this.setState({ message: '' });
      }.bind(this), 1000);
    }
    else {
      wrongGuesses.push(letter);
      this.setState({ numberofGuesses: this.state.numberofGuesses - 1 })
    }
  }

  roundComplete = () => {
    if (lettersInChosenWord.toString() === blanksAndUnderscores.toString()) {
      this.setState({ winCount: this.state.winCount + 1, showWin: true })
    } else if (this.state.numberofGuesses === 1 ) {
      this.setState({ lossCount: this.state.lossCount + 1, show: true })

    }
  }

  handleHideWin = () => this.setState({ showWin: false }, () => this.exitApp())

  handleHideModal = () => this.setState({ show: false, error: false }, () => this.componentDidMount())

  handleClick = (event) => {
   lettersGuessed = event.target.value
   if (this.state.numberofGuesses <= 8 && this.state.hasPaid === false) {
      this.showLightning()
    }
    else {
      this.checkLetter(lettersGuessed);
      this.roundComplete();
    }
  }

  getHint = () => {
    if (this.state.numberofGuesses <= 3) {
      this.setState({ message: "Not enough guesses to use hint" })
    } else {
      this.setState({ button: false, hint: true, numberofGuesses: this.state.numberofGuesses - 3 })
    }
  }

  exitApp = () => {
    this.startGame()
  }

  getText = () => {
    return "03a8355790b89f4d96963019eb9413b9a2c884691837ac976bacfe25a5212892d7@99.71.113.187:9735";
  }

  getQR = () => this.setState({ showQR: true, showYes: false })

  getPaymentRequest = () => {
    const charge = this.state.charge
    return charge
  }

  render() {
    return (
      <Wrapper>
        <Jumbtron><span id="score"> Wins: {this.state.winCount} </span>{"  "}<span id="topscore"> Losses: {this.state.lossCount}</span>{" "}<span id="message">{this.state.message}</span>{" "} </Jumbtron>
        <Container>
          <Row>
            <Column size='md-12'>
              <h1 className='yourWord'>Your Word</h1>
              <h1 className='word'>{blanksAndUnderscores}</h1>
              <div id="buttons" ><ul id = 'alphabet' >{alphabet.map((letter, i) => (
              <button id='letters' value = {letter} onClick={this.handleClick}>{letter}</button> ))}</ul></div>
            </Column>
          </Row>
          <Row>
            <Column size='md-4' id='column'>
              <h1>Letters Already Guessed</h1>
              <h1 className='word'>{wrongGuesses}</h1>
            </Column>
            <Column size='md-4'>
              {this.state.button ? <button id='hint' onClick={this.getHint}>hint</button> : null}
              {this.state.hint ? <span id='image'><img alt={chosenWord} src={this.state.image} /></span> : null}

            </Column>
            <Column size='md-4'>
              <h1>Guesses Left</h1>
              <h1>{this.state.numberofGuesses}</h1>

            </Column>


            <ErrorModal
              show={this.state.error}
              handleClose={this.handleHideModal} />

            <LoseModal
              show={this.state.show}
              word={chosenWord}
              definition={this.state.definition}
              handleClose={this.handleHideModal} />

            <QRModal
              show={this.state.showLightning}
              showYes={this.state.showYes}
              getQR={this.getQR}
              showQR={this.state.showQR}
              paid={this.state.paid}
              exit={this.state.exit}
              chargePlayer={this.chargePlayer}
              exitApp={this.exitApp}
              amount={this.state.amount}
              charge={this.state.charge}
              getPaymentRequest={this.getPaymentRequest} />

            <WinModal
              show={this.state.showWin}
              handleHideWin={this.handleHideWin}
              getText={this.getText}
              word={chosenWord}
              definition={this.state.definition} />

          </Row>
          <footer>Version 1.0< a href='https://github.com/jivinjules/CryptoWordGuess'><i className="fab fa-github"></i></a></footer>
        </Container>
      </Wrapper >
    );
  }
}

export default App;

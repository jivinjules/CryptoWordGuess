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
import LoseModal from './Components/Modal/QRModal';
import API from './utils/API'

const QRCode = require('qrcode.react');
const wordArray = []

class App extends Component {
  state = {
    image: '',
    words,
    chosenWord: '',
    lettersInChosenWord: [],
    numberOfBlanks: 0,
    blanksAndUnderscores: [],
    wrongGuesses: [],
    lettersGuessed: '',
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
    console.log(`"${word.name}"`)
    wordArray.push(`${word.name}`)
    return wordArray
  })


  startGame = () => {
    this.theWords()
    console.log(wordArray)
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)]
    const splitWord = randomWord.split("")
    const blanksNeeded = splitWord.length
    this.setState({
      numberofGuesses: 10,
      chosenWord: randomWord,
      lettersInChosenWord: splitWord,
      numberOfBlanks: blanksNeeded,
      // blanksAndUnderscores: [],
      wrongGuesses: []
    })
    const blanks = []
    for (var i = 0; i < blanksNeeded; i++) {
     blanks.push(' _ ')
     this.setState({blanksAndUnderscores: blanks})
    }
 
  }

  checkLetter = (letter) => {
    let letterInWord = false;
    for (var i = 0; i < this.state.numberOfBlanks; i++) {
      if (this.state.chosenWord[i] === letter) {
        letterInWord = true
      }
    }
    if (letterInWord) {
      for (var j = 0; j < this.state.numberOfBlanks; j++) {
        if (this.state.chosenWord[j] === letter) {
          this.state.blanksAndUnderscores[j].push(letter);
        }
      }

    } else {
      this.state.wrongGuesses.push(letter);
      this.setState({ numberofGuesses: -1 })
    }
  }

  roundComplete = () => {
    if (this.state.lettersInChosenWord.toString() === this.state.blanksAndUnderscores.toString()) {
      this.setState({ winCount: +1, showWin: true })
    } else if (this.state.numberOfGuesses === 0) {
      this.setState({ lossCount: +1, show: true })
      this.startGame();
    }
  }

  handleHideWin = () => this.setState({ showWin: false }, () => this.exitApp())

  handleHideModal = () => this.setState({ show: false, error: false }, () => this.handleEndOfGame())

  handleClick = (event) => {
    this.setState({ lettersGuessed: String.fromCharCode(event.which).toLowerCase() });
    this.checkLetter(this.state.letterGuessed);
    this.roundComplete();
  }

  exitApp = () => {
    // this.componentDidMount()
    window.location.href = 'https://localhost:3000'
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
console.log(this.state)
    return (
      <Wrapper>
        <Jumbtron><span id="score"> Wins: {this.state.winCount} </span>{"  "}<span id='image'>{this.state.image}</span> <span id="topscore"> Losses: {this.state.lossCount}</span>{" "} </Jumbtron>
        <Container>
          <Row>
            <Column size='md-12'>
              <h1>Your Word</h1>
              <h1 className='word'>{this.state.blanksAndUnderscores}</h1>
            </Column>
          </Row>
          <Row>
            <Column size='md-4'>
              <h1>Letters Already Guessed</h1>
              <h1>{this.state.lettersGuessed}</h1>
            </Column>
            <Column size='md-4'>
              <span id='image'>{this.state.image}</span>

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
              handleClose={this.handleHideModal} />

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

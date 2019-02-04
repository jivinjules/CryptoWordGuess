import React from 'react'
import Confetti from '../Confetti'
import './Modal.css'
import Clipboard from 'react-clipboard.js';
import ReactTooltip from 'react-tooltip'

const WinModal = props => {

    const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                LAMBO TIME!<br />
                <Confetti />
                You correctly guessed...<br />
                <strong>{props.word.toUpperCase()}</strong>: {props.definition}<br />
                <span id='connect'>Connect with the creators of Crypto Word Guess {'  '}<i className="fas fa-bolt"></i>{'  '}

                    <Clipboard option-text={props.getText} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                        <i className="fas fa-paste"></i> Connection Code </Clipboard><br />
                    <ReactTooltip />
                    Want to see more games on the lightning network? Consider a tip! 
          
                    <div id='tippin-button' data-dest='TheRandomOne18' onClick={props.hideForTips}></div></span>
                    <hr />
                <button className="standard-btn" id='modal' onClick={props.handleHideWin}>Play again?</button>
            </section>
        </div >

    )
}

export default WinModal
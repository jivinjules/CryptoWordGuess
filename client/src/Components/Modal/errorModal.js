import React from 'react'
import './Modal.css'

const ErrorModal = ({ show, handleClose }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h1>We apologize!</h1><br />
                <h1>Crypto Word Guess is currently down.</h1>
                <h1>Please try again later.</h1>
                <button className="standard-btn" id='modal' onClick={handleClose}>Play again?</button>
            </section>
        </div>

    )
}

export default ErrorModal
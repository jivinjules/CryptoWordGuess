import React from 'react'
import './Modal.css'

const LoseModal = props => {

    const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                Out of guesses!<br />
                Your word was... <br />
                <strong>{props.word.toUpperCase()}</strong>: {props.definition}.<br />
                Better luck next time.<br />
                <button className="standard-btn" id='modal' onClick={props.handleClose}>Play again?</button>
            </section>
        </div>

    )
}

export default LoseModal
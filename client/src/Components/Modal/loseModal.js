import React from 'react'
import './Modal.css'

const LoseModal = ({ show, children, handleClose }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                Out of guesses!<br />
                Your word was <strong>{children}</strong>.<br />
                Better luck next time.<br />
                <button className="standard-btn" id='modal' onClick={handleClose}>Play again?</button>
            </section>
        </div>

    )
}

export default LoseModal
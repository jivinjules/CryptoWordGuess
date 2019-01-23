import React from 'react'
import './Modal.css'

const LoseModal = ({ show, handleClose }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                Out of guesses!<br />
                Better luck next time.<br />
                <button className="standard-btn" id='modal' onClick={handleClose}>Play again?</button>
            </section>
        </div>

    )
}

export default LoseModal
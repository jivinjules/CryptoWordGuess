import React from 'react'
import './Modal.css'

const WinModal = ({ show, handleHideWin, children }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children[0]}
                LAMBO TIME!<br />
                <p id='connect'>Connect with the creators of Crypto Word Guess {'  '}<i className="fas fa-bolt"></i>{'  '}
                    {children[1]}
                </p>
                <button className="standard-btn" id='modal' onClick={handleHideWin}>Play again?</button>
            </section>
        </div >

    )
}

export default WinModal
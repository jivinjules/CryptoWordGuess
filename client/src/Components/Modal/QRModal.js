import React from 'react'
import './Modal.css'

const LoseModal = ({ show, children, showYes, getQR, showQR, chargePlayer, paid, exit, exitApp }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {showYes ?
                    <span>
                        <h1>Continue playing?</h1>
                        <button id='modal' onClick={getQR}>Yes!</button></span> : null}
                {showQR ?
                    <span>
                        {children[0]}
                        <h1 className='charge'><strong>Send Lightning Payment <i className="fas fa-bolt"></i></strong></h1>
                        <h1 className='charge'><strong>Amount: {children[1]} satoshi</strong></h1>
                        <hr />
                        <h1 className='charge2'>No mobile device? Copy payment request below! </h1>
                        <textarea id="bar">{children[2]}</textarea><br />
                        {children[3]}
                        <hr />
                        <h1 className='charge'><strong>After you have paid, click here to continue your game<i className="fas fa-arrow-circle-right"></i></strong><button className="standard-btn" id='modal' onClick={chargePlayer}>Continue Game</button></h1>
                    </span>
                    : null}
                {paid ?
                    <span>
                        <h1>Thanks for your payment!</h1>
                    </span>
                    : null}
                {exit ?
                    <span>
                        <h1>Bummer...no Payment received. Check payment again? <i className="fas fa-arrow-circle-right"></i><button className="standard-btn" id='modal' onClick={chargePlayer}>Check payment?</button></h1>
                        <button className="standard-btn" id='modal' onClick={exitApp}>Exit</button>
                    </span>
                    : null}
            </section>
        </div>

    )
}

export default LoseModal
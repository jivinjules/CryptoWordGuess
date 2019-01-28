import React from 'react'
import './Modal.css'
import Clipboard from 'react-clipboard.js';
import ReactTooltip from 'react-tooltip'

const QRCode = require('qrcode.react');

const QRModal = props => {
    const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {props.showYes ?
                    <span>
                        <h1>Continue playing?</h1>
                        <button id='modal' onClick={props.getQR}>Yes!</button></span> : null}
                {props.showQR ?
                    <span>
                        <div id='modal-qr'>
                        <QRCode value={props.charge}
                            size={128}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            renderAs={"svg"} />
                        <h1 className='charge'><strong>Send Lightning Payment <i className="fas fa-bolt"></i></strong></h1>
                        <h1 className='charge'><strong>Amount: {props.amount} satoshi</strong></h1>
                        </div>
                        <hr />
                        <h1 className='charge2'>No mobile device? Copy payment request below! </h1>
                        <textarea id="bar">{props.charge}</textarea><br />
                        <Clipboard option-text={props.getPaymentRequest} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                            Copy Payment Request</Clipboard><br />
                        <ReactTooltip />
                        <hr />
                        <h1 className='charge'><strong>After you have paid, click here to continue your game<i className="fas fa-arrow-circle-right"></i></strong><button className="standard-btn" id='modal' onClick={props.chargePlayer}>Continue Game</button></h1>
                    </span>
                    : null}
                {props.paid ?
                    <span>
                        <h1>Thanks for your payment!</h1>
                    </span>
                    : null}
                {props.exit ?
                    <span>
                        <h1>Bummer...no Payment received. Check payment again? <i className="fas fa-arrow-circle-right"></i><button className="standard-btn" id='modal' onClick={props.chargePlayer}>Check payment?</button></h1>
                        <button className="standard-btn" id='modal' onClick={props.exitApp}>Exit</button>
                    </span>
                    : null}
            </section>
        </div>

    )
}

export default QRModal
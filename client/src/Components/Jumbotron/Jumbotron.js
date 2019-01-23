import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
    <div className='jumbotron'>
     <h1 className='title'>Crypto Word Guess</h1>
     <p className='guesses'>You have 10 guesses to figure out the word or phrase. Good luck!</p>
     <h1>{props.children}</h1>
    </div>
)

export default Jumbotron;
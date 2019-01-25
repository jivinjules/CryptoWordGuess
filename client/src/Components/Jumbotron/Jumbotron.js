import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
    <div className='jumbotron'>
     <h1 className='title'>BitWord Guess</h1>
     <p className='guesses'>You have 10 guesses to figure out the word or phrase. Press any key to begin.</p>
     <h1>{props.children}</h1>
    </div>
)

export default Jumbotron;
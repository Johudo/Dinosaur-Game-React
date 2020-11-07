import React, { Component } from 'react';

import './GameOptionInput.css';

class GameOptionsInput extends Component {
    render() {
        return (
            <div className="game-option-block">
                <p className="game-option-name">{this.props.optionName + ':'}</p>
                <input type="text" size="2" onChange={event => { this.props.stateChangeFunction(event) }}/>
            </div>
        );
    }
}

export default GameOptionsInput;
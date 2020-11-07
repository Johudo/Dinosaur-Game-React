import React, { Component } from 'react';

import GameOptionInput from '../GameOptionInput/GameOptionInput'

class GameOptionsWindow extends Component {ы

    changeGameWindowWidth = (event) =>  {
        if ( isNaN( Number(event.target.value) ) ){
            event.target.value = event.target.value.slice(0, -1)
        }
        else {
            this.setState({
                gameWindowWidth: Number(event.target.value)
            })
        }
    }

    changeGameWindowHeight = (event) => {
        if ( isNaN( Number(event.target.value) ) ){
            event.target.value = event.target.value.slice(0, -1)
        }
        else {
            this.setState({
                gameWindowHeight: Number(event.target.value)
            })
        }
    }

    render() {
        return (
            <div className="container">
                <GameOptionInput
                    optionName="Ширина поля"
                    stateChangeFunction={ this.changeGameWindowWidth }
                />
                <GameOptionInput
                    optionName="Высота поля"
                    stateChangeFunction={ this.changeGameWindowHeight }
                />

                <button 
                    onClick={ () => this.props.updateGameOptinons(this.state.gameWindowWidth, this.state.gameWindowHeight) }
                >Подтвердить</button>
            </div>
        );
    }
}

export default GameOptionsWindow;
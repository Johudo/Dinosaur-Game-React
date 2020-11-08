import React, { Component } from 'react'
import CodeWindow from '../CodeWindow/CodeWindow';
import GameWindow from '../GameWindow/GameWindow';
import GameOptionsWindow from '../GameOptionsWindow/GameOptionsWindow'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            gameWindowWidth: 10,
            gameWindowHeight: 6,

            gameState: 'stopped',
            codeData: []
        }
    }


    updateGameOptinons = (newGameWindowWidth, newGameWindowHeight) => {
        this.setState({
            gameWindowWidth: newGameWindowWidth,
            gameWindowHeight: newGameWindowHeight
        });
    }


    setCodeData = async (newCodeData) => {
        await this.setState({
            codeData: newCodeData
        });
    }


    setGameState = async (newState) => {
        await this.setState({
            gameState: newState
        });
    }

    
    render() {
        return (
            <div className="container">
                <GameWindow
                    gameWindowWidth={ this.state.gameWindowWidth }
                    gameWindowHeight={ this.state.gameWindowHeight } 
                    codeData={ this.state.codeData }
                    gameState={ this.state.gameState }
                    setGameState={ this.setGameState }
                />

                <GameOptionsWindow
                    updateGameOptinons={ this.updateGameOptinons }
                />

                <CodeWindow 
                    setCodeData={ this.setCodeData }
                    setGameState={ this.setGameState }
                    gameState={ this.state.gameState }
                />  
            </div>
        )
    }
}

export default App;

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
            gameWindowHeight: 6
        }
    }


    updateGameOptinons = (newGameWindowWidth, newGameWindowHeight) => {
        console.log(newGameWindowWidth, newGameWindowHeight)
        this.setState({
            gameWindowWidth: newGameWindowWidth,
            gameWindowHeight: newGameWindowHeight
        });
    }

    
    render() {
        return (
            <div className="container">
                <GameWindow
                    gameWindowWidth={this.state.gameWindowWidth}
                    gameWindowHeight={this.state.gameWindowHeight} 
                />

                <GameOptionsWindow
                    updateGameOptinons={ this.updateGameOptinons }
                />
                <CodeWindow />  
            </div>
        )
    }
}

export default App;

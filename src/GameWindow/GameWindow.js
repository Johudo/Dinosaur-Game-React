import React, { Component } from 'react'
import DinosaurBlock from '../DinosaurBlock/DinosaurBlock'

import './GameWindow.css'

class GameWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div className='game-window' 
                style={{
                    width: (this.props.gameWindowWidth * 50) + 'px',
                    height: (this.props.gameWindowHeight * 50) + 'px'
                }}
            >
                <DinosaurBlock isSitted={ false } />
            </div>
        )
    }
}

export default GameWindow;
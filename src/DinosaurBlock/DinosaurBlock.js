import React, { Component } from 'react'

import './DinosaurBlock.css'

class DinosaurBlock extends Component {
    render() {
        return (
            <div
                className={ this.props.isSitted ? 'dinosaur-block dinosaur-block-sitted' : 'dinosaur-block' }
                style={ this.props.isSitted ? 
                    {
                        top: (this.props.y * 50) + 'px',
                        left: (this.props.x * 50) + 'px'
                    } :
                    {
                        top: ((this.props.y - 1) * 50) + 'px',
                        left: (this.props.x * 50) + 'px'
                    } 
                }
            >
            </div>
        )
    }
}

export default DinosaurBlock;
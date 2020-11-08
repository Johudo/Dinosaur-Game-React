import React, { Component } from 'react'

import './WallBlock.css'

class WallBlock extends Component {
    render() {
        return (
            <div 
                className={ 'wall-block ' + this.props.type }
                style={{
                    top: this.props.y * 50 + 'px',
                    left: this.props.x * 50 + 'px',
                    width: this.props.width * 50 + 'px',
                    height: this.props.height * 50 + 'px'
                }}
            ></div>
        )
    }
}

export default WallBlock;
import React, { Component } from 'react'

import './DinosaurBlock.css'

class DinosaurBlock extends Component {
    
    constructor(props) {
        super(props)
    }   

    render() {
        return (
            <div className={this.props.isSitted ? 'dinosaur-block dinosaur-block-sitted' : 'dinosaur-block' }>
            </div>
        )
    }
}

export default DinosaurBlock;
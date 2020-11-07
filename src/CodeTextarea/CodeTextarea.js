import React, { Component } from 'react'

import './CodeTextarea.css'

class CodeTextarea extends Component {
    render() {
        return (
            <textarea 
                className='code-textarea' 
                onChange={ event => { this.props.changeCodeText(event) } }
            ></textarea>
        )
    }
}

export default CodeTextarea;
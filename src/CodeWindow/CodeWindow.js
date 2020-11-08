import React, { Component } from 'react'
import CodeTextarea from '../CodeTextarea/CodeTextarea';

import './CodeWindow.css'

class CodeEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeText: 'Jump(3);\nSit();\nRun(4);'
        }

        this.avalibleCommands = [
            {
                command: 'jump',
                regExp: new RegExp('^Jump\\(\\d*\\);$')
            },
            {
                command: 'run',
                regExp: new RegExp('^Run\\(\\d*\\);$')
            },
            {
                command: 'sit',
                regExp: new RegExp('^Sit\\(\\d*\\);$')
            }
        ];
    }


    changeCodeText = (event) => {
        this.setState({
            codeText: event.target.value
        });
    }


    // Проверка кода на ошибки
    checkCodeTextErrors = () => {
        let codeLines = this.state.codeText.split('\n')
        let programCommands = [];

        // Проходимся по строкам кода
        for (let lineIndex in codeLines) {
            let lineError = true
            let line = codeLines[lineIndex].trim()

            if (line === '') 
                continue;

            // Проверям удовлетворяет ли строка доступным командам
            for (let regExpIndex in this.avalibleCommands) {
                if ( this.avalibleCommands[regExpIndex].regExp.test(line) ) {
                    lineError = false;

                    // Парсим аргументы команды
                    let argument = line.substr(
                        line.indexOf('(') + 1,
                        line.indexOf(')') - line.indexOf('(') - 1
                    ) || 1;

                    programCommands.push({
                        command: this.avalibleCommands[regExpIndex].command,
                        argument: argument
                    })

                    break;
                }
            }

            if (lineError) {
                console.error("Ошибка в строке #" + lineIndex + ":\n", line)
                this.props.setCodeData([]);
                return false
            }
        }

        this.props.setCodeData(programCommands);
        return true
    }


    runCode() {
        if( this.checkCodeTextErrors() )
            this.props.setGameState('runned')
    }


    stopCode() {
        this.props.setGameState('stopping')
    }


    render() {
        return (
            <div className='code-window'>
                <CodeTextarea changeCodeText={ this.changeCodeText } />

                <button 
                    className={
                        this.props.gameState === 'stopped' ? 'code-window-button code-run-button' : 'code-window-button code-run-button code-window-button__disabled code-run-button__disabled'
                    }
                    onClick={ () => this.runCode() }
                    disabled={
                        this.props.gameState === 'stopped' ? false : true
                    }
                >Run Code</button>

                <button 
                    className={
                        this.props.gameState === 'runned' ? 'code-window-button code-stop-button' : 'code-window-button code-stop-button code-window-button__disabled code-stop-button__disabled'
                    }
                    onClick={ () => this.stopCode() }
                    disabled={
                        this.props.gameState === 'runned' ? false : true
                    }
                >Stop Code</button>

            </div>
        )
    }
}

export default CodeEditor;
import React, { Component } from 'react'
import DinosaurBlock from '../DinosaurBlock/DinosaurBlock'

import './GameWindow.css'

class GameWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sleepDuration: 500,
            codeData: [],
            dinosaurIsSitted: false,
            dinosaurCoordinates: {
                x: 0,
                y: this.props.gameWindowHeight - 1
            }
        }

        this.createGameField();
    }


    // Создание 2мерного массива поля игры
    async createGameField() {
        await this.setState({
            dinosaurIsSitted: false,
            dinosaurCoordinates: {
                x: 0,
                y: this.props.gameWindowHeight - 1
            }
        });

        let gameField = Array(this.props.gameWindowHeight)

        for (let i = 0; i < gameField.length; i++) {
            gameField[i] = Array(this.props.gameWindowWidth)
        
            for (let j = 0; j < gameField[i].length; j++) {
                gameField[i][j] = ''
            }
        }

        this.gameField = gameField;

        // Добавляем динозавра в поле
        this.addDinosaurOnField();
    }


    async startGameModeling() {
        console.log('STARTED')
        console.log(this.props.codeData)

        await this.createGameField();

        let codeData = this.props.codeData

        if ( !(await this.sleepAnimation()) )
            return false;

        for (let i = 0; i < codeData.length; i++) {
            switch (codeData[i].command) {
                case 'run':         
                    if ( !(await this.makeDinosaurRun(codeData[i].argument)) )
                        return false;
                    break;

                case 'sit':
                    if ( !(await this.makeDinosaurSit(codeData[i].argument)) )
                        return false;
                    break;
                    
                case 'jump':
                    if ( !(await this.makeDinosaurJump(codeData[i].argument)) )
                        return false;
                    break;
            
                default:
                    console.error('startGameModeling error! Command:', codeData[i])
                    return false;
            }   
        }

        this.props.setGameState('stopped')
        return true;
    }


    addDinosaurOnField() {
        if (this.state.dinosaurIsSitted) {
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] = 'dino'
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x + 1] = 'dino'
        }
        else {
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] = 'dino'
            this.gameField[this.state.dinosaurCoordinates.y - 1][this.state.dinosaurCoordinates.x] = 'dino'
        }
    }


    deleteDinosaurOnField() {
        if (this.state.dinosaurIsSitted) {
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] = ''
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x + 1] = ''
        }
        else {
            this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] = ''
            this.gameField[this.state.dinosaurCoordinates.y - 1][this.state.dinosaurCoordinates.x] = ''
        }
    }


    // Функция бега динозавра
    async makeDinosaurRun(argument) {
        for (let i = 0; i < argument; i++) {
            if ( !(await this.changeDinosaurState({
                dinosaurCoordinates: {
                    x: this.state.dinosaurCoordinates.x + 1,
                    y: this.state.dinosaurCoordinates.y
                } 
            })) )
                return false;
        }

        return true;
    }


    // Функция приседа динозавра
    async makeDinosaurSit(argument) {
        if ( !(await this.changeDinosaurState({ dinosaurIsSitted: true })) )
            return false;

        if ( !(await this.makeDinosaurRun(argument)) )
            return false;

        if ( !(await this.changeDinosaurState({ dinosaurIsSitted: false })) )
            return false;

        return true;
    }


    // Функция прыжка динозавра
    async makeDinosaurJump(argument) {
        if ( !(await this.changeDinosaurState({
            dinosaurCoordinates: {
                x: this.state.dinosaurCoordinates.x + 1,
                y: this.state.dinosaurCoordinates.y - Number(argument)
            } 
        })) )
            return false;

        if ( !(await this.changeDinosaurState({
            dinosaurCoordinates: {
                x: this.state.dinosaurCoordinates.x + 1,
                y: this.state.dinosaurCoordinates.y + Number(argument)
            } 
        })) )
            return false;

        return true;
    }


    // Функция прыжка динозавра
    async changeDinosaurState(newState) {
        this.deleteDinosaurOnField();

        await this.setState(newState)

        if ( !(this.checkDinosaurInField()) )
            return false;
        
        this.addDinosaurOnField();
        console.log(this.gameField);

        if ( !(await this.sleepAnimation()) )
            return false;

        return true;
    }


    // Проверка не вышел ли динозавр за пределы поля
    checkDinosaurInField() {
        if (this.state.dinosaurIsSitted) {
            if (this.state.dinosaurCoordinates.x < 0 ||
                this.state.dinosaurCoordinates.x + 1 > this.props.gameWindowWidth - 1 ||
                this.state.dinosaurCoordinates.y > this.props.gameWindowHeight - 1 ||
                this.state.dinosaurCoordinates.y < 0 ){
                    console.error('Динозавр за пределами поля!');
                    this.props.setGameState('stopped');
                    return false
                }

            return true
        }
        else {
            if (this.state.dinosaurCoordinates.x < 0 ||
                this.state.dinosaurCoordinates.x > this.props.gameWindowWidth - 1 ||
                this.state.dinosaurCoordinates.y > this.props.gameWindowHeight - 1 ||
                this.state.dinosaurCoordinates.y - 1 < 0 ){
                    console.error('Динозавр за пределами поля!');
                    this.props.setGameState('stopped');
                    return false
                }

            return true
        }
    }
    

    async sleepAnimation() {
        // Выполняем паузу, если не менялось состояние
        if (this.props.gameState === 'runned') {
            await new Promise(resolve => setTimeout(resolve, this.state.sleepDuration))
            return true
        }
        // Не выполняем паузу и меняем состояние, если менялось состояние
        else if (this.props.gameState === 'stopping') {
            this.props.setGameState('stopped');
            return false
        }
        else {
            console.error('Error state in GameWindow.sleepAnimation()!', this.props.gameState);
            return false
        }
    }


    componentDidUpdate(prevProps) {
        // Обновить игру если поменялись размеры поля
        if (prevProps.gameWindowWidth !== this.props.gameWindowWidth || prevProps.gameWindowHeight !== this.props.gameWindowHeight) 
            this.createGameField();
        // Начать игру если поменялось состояние
        else if (prevProps.gameState === 'stopped' && this.props.gameState === 'runned')
            this.startGameModeling();
    }


    render() {
        return (
            <div
                className='game-window' 
                style={{
                    width: (this.props.gameWindowWidth * 50) + 'px',
                    height: (this.props.gameWindowHeight * 50) + 'px'
                }}
            >

                <DinosaurBlock
                    isSitted={ this.state.dinosaurIsSitted }
                    x={ this.state.dinosaurCoordinates.x }
                    y={ this.state.dinosaurCoordinates.y }
                />

            </div>
        )
    }
}

export default GameWindow;
import React, { Component } from 'react'
import DinosaurBlock from '../DinosaurBlock/DinosaurBlock'
import WallBlock from '../WallBlock/WallBlock'

import './GameWindow.css'

class GameWindow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sleepDuration: 500,
            codeData: [],
            wallsArray: [],
            dinosaurIsSitted: false,
            dinosaurCoordinates: {
                x: 0,
                y: this.props.gameWindowHeight - 1
            }
        }
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

        // Добавляем динозавра в поле и генерируем стены
        this.addDinosaurOnField();
        this.addWallsOnField()
    }


    async generateWallsOnField() {
        let fieldWidth = this.props.gameWindowWidth;
        let fieldHeight = this.props.gameWindowHeight;

        let wallsArray = [];
        let index = 1;

        // Генерируем массив стен
        while (index < fieldWidth - 1) {
            let wallType = this.randomNumber(0, 2);

            // Пропуск
            if (wallType === 0) {
                index += 1;
            }
            // Стена для команды sit
            else if (wallType === 1) {
                let wallWidth = index < fieldWidth - 3 ? this.randomNumber(1, 3) : 1;

                wallsArray.push({
                    wallType: 'top-wall',
                    size: {
                        width: wallWidth,
                        height: fieldHeight - 1
                    },
                    coordinates: {
                        x: index,
                        y: 0
                    }
                })

                index += (wallWidth + 2);
            }
            // Стена для команды jump
            else if (wallType === 2) {
                let spaceSize = this.randomNumber(2, 4);
                let bottomWallSize = this.randomNumber(1, fieldHeight - spaceSize);
                let topWallSize = fieldHeight - spaceSize - bottomWallSize

                wallsArray.push({
                    wallType: 'top-wall',
                    size: {
                        width: 1,
                        height: topWallSize
                    },
                    coordinates: {
                        x: index,
                        y: 0
                    }
                });

                wallsArray.push({
                    wallType: 'bottom-wall',
                    size: {
                        width: 1,
                        height: bottomWallSize
                    },
                    coordinates: {
                        x: index,
                        y: fieldHeight - bottomWallSize
                    }
                });

                index += 2;
            }
        }

        console.log(wallsArray) 

        await this.setState({
            wallsArray: wallsArray
        });

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


    addWallsOnField() {
        let wallsArray = this.state.wallsArray;
        let gameField = this.gameField;

        for (let wallIndex = 0; wallIndex < wallsArray.length; wallIndex++) {
            for (let i = wallsArray[wallIndex].coordinates.x; i < wallsArray[wallIndex].coordinates.x + wallsArray[wallIndex].size.width; i++) {
                for (let j = wallsArray[wallIndex].coordinates.y; j < wallsArray[wallIndex].coordinates.y + wallsArray[wallIndex].size.height; j++) {
                    gameField[j][i] = 'wall';
                }
            }
        }

        this.gameField = gameField;
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
                x: this.state.dinosaurCoordinates.x,
                y: this.state.dinosaurCoordinates.y - Number(argument)
            } 
        })) )
            return false;

        if ( !(await this.makeDinosaurRun(2)) )
            return false;

        if ( !(await this.changeDinosaurState({
            dinosaurCoordinates: {
                x: this.state.dinosaurCoordinates.x,
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

        console.log(this.state)

        if ( !(this.checkDinosaurInField()) )
            return false;

        if ( !(this.checkGameIsLosed()) )
            return false;

        if ( !(this.checkGameIsWinned()) )
            return false;
        
        this.addDinosaurOnField();
        console.log(this.gameField);

        if ( !(await this.sleepAnimation()) )
            return false;

        return true;
    }


    checkGameIsWinned() {
        if (this.state.dinosaurIsSitted) {
            if ((this.state.dinosaurCoordinates.x + 1) === this.props.gameWindowWidth - 1 ){
                console.log('Вы выйграли!');
                this.props.setGameState('stopped');
                return false
            }

            return true
        }
        else {
            if ((this.state.dinosaurCoordinates.x) === this.props.gameWindowWidth - 1 ){
                console.log('Вы выйграли!');
                this.props.setGameState('stopped');
                return false
            }

            return true
        }
    }


    checkGameIsLosed() {
        if (this.state.dinosaurIsSitted) {
            if (this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] !== '' ||
                this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x + 1] !== '' ){
                    console.error('Вы проиграли!');
                    this.props.setGameState('stopped');
                    return false
                }

            return true
        }
        else {
            if (this.gameField[this.state.dinosaurCoordinates.y][this.state.dinosaurCoordinates.x] !== '' ||
                this.gameField[this.state.dinosaurCoordinates.y - 1][this.state.dinosaurCoordinates.x] !== '' ){
                    console.error('Вы проиграли!');
                    this.props.setGameState('stopped');
                    return false
                }

            return true
        }
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


    randomNumber(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }


    async componentDidUpdate(prevProps) {
        // Обновить игру если поменялись размеры поля
        if (prevProps.gameWindowWidth !== this.props.gameWindowWidth || prevProps.gameWindowHeight !== this.props.gameWindowHeight) {
            await this.generateWallsOnField();
            this.createGameField();
        }
        // Начать игру если поменялось состояние
        else if (prevProps.gameState === 'stopped' && this.props.gameState === 'runned')
            this.startGameModeling();
    }

    async componentDidMount() {
        await this.generateWallsOnField();
        this.createGameField();
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

                {
                    this.state.wallsArray.map((elem, index) => {
                        return (
                            <WallBlock 
                                type={ elem.wallType }
                                x={ elem.coordinates.x } 
                                y={ elem.coordinates.y } 
                                width={ elem.size.width }
                                height={ elem.size.height }
                                key={ index }
                            />
                        )
                    })
                }

                <WallBlock 
                    type="win-wall"
                    x={ this.props.gameWindowWidth - 1 } 
                    y={ 0 } 
                    width={ 1 }
                    height={ this.props.gameWindowHeight }
                />

            </div>
        )
    }
}

export default GameWindow;
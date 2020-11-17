import React from 'react';
import Grid from '@material-ui/core/Grid';
import Board from './board';
import { defineTableChanges, calculateWinner } from '../utils/gameLogic';
import { gameReducer } from './gameReducer'
import { GAME_INITIAL_STATE } from './gameInitialState'

function useGame () {
    const [gameState, gameStateDispatcher] = React.useReducer(
        gameReducer,
        GAME_INITIAL_STATE
    );

    function handleClick(clickedSquare) {
        let newState = defineTableChanges(gameState.squares, gameState.redIsNext, clickedSquare);
        gameStateDispatcher({ type: 'NEW_PLAY', state: newState });
        console.log(newState);
    }

    return {
        gameState,
        handleClick
    };
}

function Game() {
    const {
        gameState,
        handleClick
     } = useGame();

    let boardSquares = gameState.squares.slice();
    let status;
    if (!calculateWinner(boardSquares)) {
        status = "Next player: " + (gameState.redIsNext ? "RED" : "GRAY");
    } else if (calculateWinner(boardSquares) === "red") {
        status = "Red Win !";
    } else if (calculateWinner(boardSquares) === "gray") {
        status = "Gray Win !";
    }

    return ( 
        <Grid item xs = { 12 } className = "game" >
            <Grid item container justify = "center" xs = { 8 } className = "game-board" >
                <Board squares = { boardSquares } onClick = { handleClick }/> 
            </Grid> 
            <Grid item container justify = "center" xs = { 4 } className = "game-info" >
                <Grid item > { status } </Grid> 
            </Grid> 
        </Grid>
    );
}

export default Game;
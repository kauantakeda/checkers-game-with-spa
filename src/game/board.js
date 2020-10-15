import React from 'react';
import Grid from '@material-ui/core/Grid';
import Square from './square';
import GameConfig from './game_conf';
import { squareIsBlack } from './gameLogic';

function Board(props) {
    function renderSquare(row, column) {
        let buttonClassName;
        if (squareIsBlack(row * GameConfig.quantityOfRows + column)) {
            buttonClassName = "black-square";
        } else {
            buttonClassName = "white-square";
        }
        return (
            <Square
            buttonClassName={buttonClassName}
            value={props.squares[GameConfig.quantityOfRows * row + column]}
            onClick={() => props.onClick(GameConfig.quantityOfRows * row + column)}
            />
        );
    }
    
    function createBoard(quantityOfRows, quantityOfColumns) {
        var board = [];
        for (var i = 0; i < quantityOfRows; i++) {
            let row = [];
            for (var j = 0; j < quantityOfColumns; j++) {
                row.push(renderSquare(i, j));
            }
            board.push(<Grid item xs={12} className="board-row">{row}</Grid>);
        }
        console.log(board);
        return board;
    }
    
    return <Grid item>{createBoard(GameConfig.quantityOfRows, GameConfig.quantityOfColumns)}</Grid>;
}

export default Board;
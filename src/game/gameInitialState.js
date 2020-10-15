import GameConfig from './game_conf';
import { squareIsBlack } from './gameLogic';

const initial_squares_state = setInitialBoard();

const GAME_INITIAL_STATE = {
    squares: initial_squares_state,
    redIsNext: false,
};

function setInitialBoard() {
    var initialBoard = Array(GameConfig.quantityOfColumns * GameConfig.quantityOfRows).fill(
        "null-piece"
    );

    for (var i = 0; i < initialBoard.length; i++) {
        if (squareIsBlack(i)) {
            if (i < GameConfig.quantityOfRowsFilledWithPieces * GameConfig.quantityOfRows) {
                initialBoard[i] = "red-piece";
            } else if (
                i >
                initialBoard.length -
                (GameConfig.quantityOfRowsFilledWithPieces * GameConfig.quantityOfRows + 1)
            ) {
                initialBoard[i] = "gray-piece";
            }
        }
    }

    return initialBoard;
}

export { GAME_INITIAL_STATE };
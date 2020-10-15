import GameConfig from './game_conf';

function defineTableChanges (squares, redIsNext, clickedSquare) {
    let newState = {
        squares: squares,
        redIsNext: redIsNext
    }
    let selectedPiece = findSelectedPiece(newState.squares);
    if (!selectedPiece) {
        if (
            selectedPieceBelongNextPlayer(newState.redIsNext, newState.squares[clickedSquare])
        ) {
            newState.squares[clickedSquare] = "selected-" + newState.squares[clickedSquare];
        }
    } else {
        let selectedPieceColor = newState.squares[selectedPiece].substring(9, newState.squares[selectedPiece].length);
        if (movementIsValid(clickedSquare, newState.squares, newState.redIsNext)) {
            if (isLastRow(newState.redIsNext, clickedSquare) && !isQueen(newState.squares[selectedPiece])) {
                newState.squares[clickedSquare] = "queen-" + selectedPieceColor;
            } else {
                newState.squares[clickedSquare] = selectedPieceColor;
            }
            newState.squares[selectedPiece] = "null-piece";
            newState.redIsNext = !newState.redIsNext;
        } else {
            newState.squares[selectedPiece] = selectedPieceColor;
        }
    }
    return newState;
}

function calculateWinner(squares) {
    let hasRed = false;
    let hasGray = false;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].includes("red")) {
            hasRed = true;
        } else if (squares[i].includes("gray")) {
            hasGray = true;
        }
    }
    if (!hasRed) {
        return "gray";
    } else if (!hasGray) {
        return "red";
    }
    return false;
}

function squareIsBlack(squarePosition) {
    let ySquarePosition = Math.floor(squarePosition / GameConfig.quantityOfRows);
    let xSquarePosition = squarePosition - ySquarePosition * GameConfig.quantityOfRows;
    if ((ySquarePosition + xSquarePosition) % 2 !== 0) {
        return true;
    }
    return false;
}

function selectedPieceBelongNextPlayer(redIsNext, pieceSelectedValue) {
    if (
        (redIsNext && pieceSelectedValue.includes("red-piece")) ||
        (!redIsNext && pieceSelectedValue.includes("gray-piece"))
    ) {
        return true;
    }
    return false;
}

function movementIsValid(clickedSquare, squares, redIsNext) {
    let selectedPiece = findSelectedPiece(squares);
    let differenceOfSelectedAndClickedSquare = clickedSquare - selectedPiece;
    let ignoreSquares;
    if (squareIsBlack(clickedSquare) && squares[clickedSquare] === "null-piece") {
        if (isQueen(squares[selectedPiece])) {
            ignoreSquares = [];
            if (
                differenceOfSelectedAndClickedSquare === GameConfig.leftDiagonalSquare ||
                differenceOfSelectedAndClickedSquare === GameConfig.rightDiagonalSquare ||
                differenceOfSelectedAndClickedSquare === -GameConfig.leftDiagonalSquare ||
                differenceOfSelectedAndClickedSquare === -GameConfig.rightDiagonalSquare
            ) {
                return true;
            }
        } else if (redIsNext) {
            ignoreSquares = [
                selectedPiece - GameConfig.leftDiagonalSquare,
                selectedPiece - GameConfig.rightDiagonalSquare
            ];
            if (
                differenceOfSelectedAndClickedSquare === GameConfig.leftDiagonalSquare ||
                differenceOfSelectedAndClickedSquare === GameConfig.rightDiagonalSquare
            ) {
                return true;
            }
        } else if (!redIsNext) {
            ignoreSquares = [
                selectedPiece + GameConfig.leftDiagonalSquare,
                selectedPiece + GameConfig.rightDiagonalSquare
            ];
            if (
                differenceOfSelectedAndClickedSquare === -GameConfig.leftDiagonalSquare ||
                differenceOfSelectedAndClickedSquare === -GameConfig.rightDiagonalSquare
            ) {
                return true;
            }
        }
        if (
            isCaptureMove(
                squares,
                redIsNext,
                selectedPiece,
                clickedSquare,
                ignoreSquares
            )
        ) {
            return true;
        }
    }
    return false;
}

function findSelectedPiece(squares) {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].includes("selected")) {
            return i;
        }
    }
    return false;
}

function isCaptureMove(
    squares,
    redIsNext,
    actualSquare,
    clickedSquare,
    ignoreSquares
) {
    let downLeftDiagonalSquare = actualSquare + GameConfig.leftDiagonalSquare;
    let downRightDiagonalSquare = actualSquare + GameConfig.rightDiagonalSquare;
    let upRightDiagonalSquare = actualSquare - GameConfig.leftDiagonalSquare;
    let upLeftDiagonalSquare = actualSquare - GameConfig.rightDiagonalSquare;
    if (!isIgnoreSquare(downLeftDiagonalSquare, ignoreSquares)) {
        if (isOpositeColor(redIsNext, squares[downLeftDiagonalSquare])) {
            if (squares[actualSquare + 2 * GameConfig.leftDiagonalSquare] === "null-piece") {
                if (clickedSquare === actualSquare + 2 * GameConfig.leftDiagonalSquare) {
                    squares[downLeftDiagonalSquare] = "null-piece";
                    return true;
                } else {
                    ignoreSquares = [downLeftDiagonalSquare];
                    if (
                        isCaptureMove(
                            squares,
                            redIsNext,
                            actualSquare + 2 * GameConfig.leftDiagonalSquare,
                            clickedSquare,
                            ignoreSquares
                        )
                    ) {
                        squares[downLeftDiagonalSquare] = "null-piece";
                        return true;
                    }
                }
            }
        }
    }
    if (!isIgnoreSquare(downRightDiagonalSquare, ignoreSquares)) {
        if (isOpositeColor(redIsNext, squares[downRightDiagonalSquare])) {
            if (squares[actualSquare + 2 * GameConfig.rightDiagonalSquare] === "null-piece") {
                if (clickedSquare === actualSquare + 2 * GameConfig.rightDiagonalSquare) {
                    squares[downRightDiagonalSquare] = "null-piece";
                    return true;
                } else {
                    ignoreSquares = [downRightDiagonalSquare];
                    if (
                        isCaptureMove(
                            squares,
                            redIsNext,
                            actualSquare + 2 * GameConfig.rightDiagonalSquare,
                            clickedSquare,
                            ignoreSquares
                        )
                    ) {
                        squares[downRightDiagonalSquare] = "null-piece";
                        return true;
                    }
                }
            }
        }
    }
    if (!isIgnoreSquare(upRightDiagonalSquare, ignoreSquares)) {
        if (isOpositeColor(redIsNext, squares[upRightDiagonalSquare])) {
            if (squares[actualSquare - 2 * GameConfig.leftDiagonalSquare] === "null-piece") {
                if (clickedSquare === actualSquare - 2 * GameConfig.leftDiagonalSquare) {
                    squares[upRightDiagonalSquare] = "null-piece";
                    return true;
                } else {
                    ignoreSquares = [upRightDiagonalSquare];
                    if (
                        isCaptureMove(
                            squares,
                            redIsNext,
                            actualSquare - 2 * GameConfig.leftDiagonalSquare,
                            clickedSquare,
                            ignoreSquares
                        )
                    ) {
                        squares[upRightDiagonalSquare] = "null-piece";
                        return true;
                    }
                }
            }
        }
    }
    if (!isIgnoreSquare(upLeftDiagonalSquare, ignoreSquares)) {
        if (isOpositeColor(redIsNext, squares[upLeftDiagonalSquare])) {
            if (squares[actualSquare - 2 * GameConfig.rightDiagonalSquare] === "null-piece") {
                if (clickedSquare === actualSquare - 2 * GameConfig.rightDiagonalSquare) {
                    squares[upLeftDiagonalSquare] = "null-piece";
                    return true;
                } else {
                    ignoreSquares = [upLeftDiagonalSquare];
                    if (
                        isCaptureMove(
                            squares,
                            redIsNext,
                            actualSquare - 2 * GameConfig.rightDiagonalSquare,
                            clickedSquare,
                            ignoreSquares
                        )
                    ) {
                        squares[upLeftDiagonalSquare] = "null-piece";
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function isIgnoreSquare(square, ignoreSquares) {
    for (var i = 0; i < ignoreSquares.length; i++) {
        if (square === ignoreSquares[i]) {
            return true;
        }
    }
    return false;
}

function isOpositeColor(redIsNext, piece) {
    if (!(piece === undefined)) {
        if (redIsNext && piece.includes("gray-piece")) {
            return true;
        } else if (!redIsNext && piece.includes("red-piece")) {
            return true;
        }
    }
    return false;
}

function isLastRow(redIsNext, position) {
    if (redIsNext) {
        return (position > (((GameConfig.quantityOfRows - 1) * GameConfig.quantityOfColumns) - 1));
    } else {
        return (position < GameConfig.quantityOfColumns);
    }
}

function isQueen(piece) {
    return piece.includes("queen");
}

export { squareIsBlack, defineTableChanges, calculateWinner };
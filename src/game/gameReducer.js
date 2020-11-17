const gameReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_PLAY':
            return {
                ...state, 
                squares: action.state.squares,
                redIsNext: action.state.redIsNext
            };
        default:
            throw new Error();
    }
}

export { gameReducer };
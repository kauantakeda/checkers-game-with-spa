import React from 'react';
import Grid from '@material-ui/core/Grid';
import './game.css';

const Square = ( {buttonClassName, onClick, value} ) => {
    return (
        <button className={buttonClassName} onClick={onClick}>
            <Grid item class={value} />
        </button>
    );
}
export default Square;
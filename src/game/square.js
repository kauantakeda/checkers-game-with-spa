import React from 'react';
import Grid from '@material-ui/core/Grid';
import './game.css';

function Square(props) {
    return (
        <button className={props.buttonClassName} onClick={props.onClick}>
            <Grid item class={props.value} />
        </button>
    );
}
export default Square;
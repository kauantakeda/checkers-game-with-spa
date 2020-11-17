import React from 'react';
import Grid from '@material-ui/core/Grid';
import GamePage from './pages/gamePage';
import Home from './pages/home/home';
import NewGamePage from './pages/new_game/newGamePage';
import LoadGamePage from './pages/load_game/loadGamePage';
import { Route, NavLink, HashRouter } from "react-router-dom";

function Main() {
    return (
        <Grid container>
            <HashRouter>
                <Grid item xs={12}>
                    <ul className="header">
                        {/* <li><NavLink to="/">Home</NavLink></li> */}
                        <li><NavLink to="/">GamePage</NavLink></li>
                        {/* <li><NavLink to="/new-game">New Game</NavLink></li>
                        <li><NavLink to="/load-game">Load Game</NavLink></li> */}
                    </ul>
                </Grid>
                <Grid container item xs={12} justify="center">
                    <Grid item xs={8}>
                        {/* <Route exact path="/" component={Home}/> */}
                        <Route path="/" component={GamePage}/>
                        {/* <Route path="/new-game" component={NewGamePage}/>
                        <Route path="/load-game" component={LoadGamePage}/> */}
                    </Grid>
                </Grid>
            </HashRouter>
        </Grid>
    );
}


export default Main;

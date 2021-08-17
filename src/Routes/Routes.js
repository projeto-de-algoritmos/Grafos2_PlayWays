import React from 'react';
import {
    Route, Switch, Redirect,
} from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import PlayWay from '../Pages/PlayWay';
import Priorities from '../Pages/Priorities';

const Router = () => {

    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/playway" exact component={PlayWay} />
            <Route path="/prioridades" exact component={Priorities} />

            <Redirect path="*" to="/" />
        </Switch>
        
    )

    

}

export default Router;
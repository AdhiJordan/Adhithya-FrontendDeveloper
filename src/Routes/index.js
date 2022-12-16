import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import Dashboard from '../Pages/Dashboard.js';
import NotFoundPage from '../Pages/NotFoundPage.js';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path={'/dashboard'} component={Dashboard} />
                <Route exact path={'/:id'} component={Dashboard} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Navigation;

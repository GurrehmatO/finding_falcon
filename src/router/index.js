import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home.component';
import Header from '../components/Header/Header.component';


const Router = () => (
  <Switch>
    <Route exact path="/result" component={Header} />
    <Route path="/" component={Home} />
  </Switch>
);

export default withRouter(Router);

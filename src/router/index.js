import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../components/Home/Home.component';
import Result from '../containers/Result/Result.container';


const Router = ({ history }) => (
  <Switch>
    <Route exact path="/result" render={() => (<Result history={history} />)} />
    <Route path="/" render={() => (<Home history={history} />)} />
  </Switch>
);

Router.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Router);

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Router from '../router';

const App = ({ history }) => (
  <BrowserRouter>
    <Router history={history} />
  </BrowserRouter>

);

App.propTypes = {
  history: PropTypes.object.isRequired,
};
export default App;

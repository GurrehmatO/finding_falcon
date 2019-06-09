
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header.component';
import Form from '../../containers/Form/Form.container';
import './Home.component.scss';

const Home = ({ history }) => (
  <main className="App">
    <Header history={history} />
    <Form history={history} />
  </main>
);

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;

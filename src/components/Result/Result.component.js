import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../Header/Header.component';
import { POST_TOKEN, POST_FIND } from '../../constants/urls';
import { FOUND, NOT_FOUND, TIME_TAKEN } from '../../constants/strings';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planet: '',
      status: '',
    };
    this.getResult();
  }

  getResult = async () => {
    const { updateToken, travel } = this.props;
    const tokenOptions = {
      method: 'POST',
      headers: { Accept: 'application/json' },
      url: POST_TOKEN,
      data: {},
    };
    const { data: { token } } = await Axios(tokenOptions);
    updateToken({ token });
    const findOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: POST_FIND,
      data: {
        ...travel,
        token,
      },
    };
    const { data: result } = await Axios(findOptions);
    if (result.status === 'success') {
      this.setState({
        status: result.status,
        planet: result.planet_name,
      });
    } else {
      this.setState({
        status: false,
      });
    }
  }

  render() {
    const { status, planet } = this.state;
    const { time } = this.props;
    return (
      <main className="App">
        <Header />
        <section className="resultContainer">
          {status ? (
            <div>
              <h2>{`${FOUND} ${planet}`}</h2>
              <h3>{`${TIME_TAKEN} ${time}`}</h3>
            </div>
          ) : (
            <div>{NOT_FOUND}</div>
          )}
        </section>
      </main>
    );
  }
}

Result.propTypes = {
  updateToken: PropTypes.func.isRequired,
  travel: PropTypes.shape({
    planet_names: PropTypes.arrayOf(PropTypes.string),
    vehicle_names: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  time: PropTypes.number.isRequired,
};

export default Result;

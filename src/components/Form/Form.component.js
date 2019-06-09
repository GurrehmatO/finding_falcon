import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GET_PLANETS, GET_VEHICLES } from '../../constants/urls';
import { SUBMIT, TIME_TAKEN } from '../../constants/strings';
import './Form.component.scss';
import Selector from './Selector/Selector.component';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: {},
      vehicles: {},
      selected: [
        {
          planet: '',
          vehicle: '',
        }, {
          planet: '',
          vehicle: '',
        }, {
          planet: '',
          vehicle: '',
        }, {
          planet: '',
          vehicle: '',
        },
      ],
    };
    this.fetchPlanets();
    this.fetchVehicles();
  }

  fetchPlanets = () => Axios.get(GET_PLANETS)
    .then(planets => this.setState({ planets: planets.data }));

  fetchVehicles = () => Axios.get(GET_VEHICLES)
    .then(vehicles => this.setState({ vehicles: vehicles.data }));

  choosePlanet = (planetName, index) => {
    const { selected } = this.state;
    selected[index].planet = planetName;
    this.setState({ selected });
  }

  chooseVehicle = (vehicleName, index) => {
    const { selected } = this.state;
    selected[index].vehicle = vehicleName;
    this.setState({ selected });
  }

  getTime = () => {
    const { updateTime, time } = this.props;
    const { planets, vehicles, selected } = this.state;
    const filteredSelected = selected.filter(selection => !(Object.values(selection).some(value => (value === ''))));
    const newTime = filteredSelected.reduce((totalTime, selection) => {
      const { distance } = planets
        .find(planet => ((planet.name === selection.planet) ? planet : undefined));
      const { speed } = vehicles
        .find(vehicle => ((vehicle.name === selection.vehicle) ? vehicle : undefined));
      return (totalTime + (distance / speed));
    }, 0);
    if (newTime !== time) {
      updateTime({ time: newTime });
    }
    return newTime;
  }

  isSubmitDisabled = () => {
    const { selected } = this.state;
    return selected.some(selection => (Object.values(selection).some(value => (value === ''))));
  }

  onSubmit = async () => {
    const { confirmTravel, history } = this.props;
    const { selected } = this.state;
    const travel = selected.reduce((acc, curr, index) => {
      acc.planet_names[index] = curr.planet;
      acc.vehicle_names[index] = curr.vehicle;
      return acc;
    }, {
      planet_names: ['', '', '', ''],
      vehicle_names: ['', '', '', ''],
    });
    confirmTravel({ travel });
    history.push('/result');
  }

  render() {
    const { planets, vehicles, selected } = this.state;
    return (
      <div className="formAndSubmit">
        {(planets.length > 0) && (vehicles.length > 0) && (
        <Fragment>
          <div className="formContainer">
            {[0, 1, 2, 3].map(index => (
              <Selector
                planets={planets}
                vehicles={vehicles}
                selected={selected}
                index={index}
                choosePlanet={this.choosePlanet}
                chooseVehicle={this.chooseVehicle}
              />
            ))}
          </div>
          <div className="timeContainer">
            {`${TIME_TAKEN}: ${this.getTime()}`}
          </div>
          <div className="buttonContainer">
            <Button
              disabled={this.isSubmitDisabled()}
              onClick={this.onSubmit}
            >
              {SUBMIT}
            </Button>
          </div>
        </Fragment>
        )}
      </div>
    );
  }
}

Form.propTypes = {
  updateTime: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  confirmTravel: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Form;

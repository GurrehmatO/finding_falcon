import React, { Component } from 'react';
// import Select from 'react-select';
import Axios from 'axios';
import { GET_PLANETS, GET_VEHICLES } from '../../constants/urls';
import './Form.component.scss';
import Selector from './Selector/Selector.component';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      vehicles: [],
      selection: {
        planetNames: [],
        vehicleNames: [],
      },
    };
    this.fetchPlanets();
    this.fetchVehicles();
  }

  fetchPlanets = () => Axios.get(GET_PLANETS)
    .then(planets => this.setState({ planets: planets.data }));

  fetchVehicles = () => Axios.get(GET_VEHICLES)
    .then(vehicles => this.setState({ vehicles: vehicles.data }));

  makeSelection = (planet, vehicle) => {
    const { selection } = this.state;
    if (selection.planetNames.indexOf(planet) === -1) {
      this.setState({
        selection: {
          planetNames: [
            ...selection.planetNames,
            planet,
          ],
          vehicleNames: {
            ...selection.vehicleNames,
            vehicle,
          },
        },
      });
    }
  };

  render() {
    const { planets, vehicles, selection } = this.state;
    return (
      <div className="formContainer">
        {(planets.length > 0) && (vehicles.length > 0) && (
          <Selector
            planets={planets}
            vehicles={vehicles}
            selection={selection}
            makeSelection={this.makeSelection}
          />
        )}
      </div>
    );
  }
}

export default Form;

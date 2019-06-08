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

  render() {
    const { planets, vehicles, selected } = this.state;
    return (
      <div className="formContainer">
        {(planets.length > 0) && (vehicles.length > 0) && (
          [0, 1, 2, 3].map(index => (
            <Selector
              planets={planets}
              vehicles={vehicles}
              selected={selected}
              index={index}
              choosePlanet={this.choosePlanet}
              chooseVehicle={this.chooseVehicle}
            />
          ))
        )}

      </div>
    );
  }
}

export default Form;

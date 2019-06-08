import React, { Component } from 'react';
import Select, { components } from 'react-select';
import propTypes from 'prop-types';
import { DESTINATION } from '../../../constants/strings';
import './Selector.component.scss';

const SingleValue = (props) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      {data.value}
    </components.SingleValue>
  );
};

class Selector extends Component {
  state = {
    planetChosen: '',
  };

  isPlanetDisabled = (planet) => {
    const { selected } = this.props;
    const selectedPlanets = selected.map(selection => selection.planet);
    return (selectedPlanets.indexOf(planet.name) !== -1);
  }

  isVehicleDisabled = (vehicle) => {
    const { planets } = this.props;
    const { planetChosen } = this.state;
    let planetDistance;
    const planetSpecs = planets
      .find(planet => ((planet.name === planetChosen) ? planet : undefined));
    if (planetSpecs.distance !== undefined) {
      planetDistance = planetSpecs.distance;
    } else planetDistance = 0;
    return ((this.getVehicleCount(vehicle.name) <= 0) || (vehicle.max_distance < planetDistance));
  }

  onPlanetChange = (planetChosen) => {
    const { choosePlanet, index } = this.props;
    this.setState({ planetChosen: planetChosen.value });
    choosePlanet(planetChosen.value, index);
  }

  onVehicleChange = (vehicleChosen) => {
    const { chooseVehicle, index } = this.props;
    chooseVehicle(vehicleChosen.value, index);
  }

  vehicleSelectionUI = () => {
    const { planetChosen } = this.state;
    const { vehicles } = this.props;
    if (planetChosen === '') {
      return null;
    }
    const vehicleOptions = vehicles.map(vehicle => ({
      value: vehicle.name,
      label: `${vehicle.name} (${this.getVehicleCount(vehicle.name)})`,
      isDisabled: this.isVehicleDisabled(vehicle),
    }));
    return (
      <div className="dropdown">
        <Select
          options={vehicleOptions}
          onChange={this.onVehicleChange}
          components={{ SingleValue }}
        />
      </div>
    );
  }

  getVehicleCount = (vehicleName) => {
    const { vehicles, selected } = this.props;
    const total = vehicles.find(vehicle => ((vehicle.name === vehicleName)
      ? vehicle : undefined)).total_no;
    const selectedNumber = selected.filter(selection => (selection.vehicle === vehicleName)).length;
    return total - selectedNumber;
  }

  render() {
    const {
      planets, index,
    } = this.props;
    const planetOptions = planets.map(planet => ({
      value: planet.name,
      label: planet.name,
      isDisabled: this.isPlanetDisabled(planet),
    }));
    return (
      <section className="selector">
        <p>{`${DESTINATION} ${index + 1}`}</p>
        <div className="dropdown">
          <Select
            options={planetOptions}
            onChange={this.onPlanetChange}
          />
        </div>
        {this.vehicleSelectionUI()}
      </section>
    );
  }
}

Selector.propTypes = {
  planets: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string,
    distance: propTypes.number,
  })).isRequired,
  vehicles: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string,
    total_no: propTypes.number,
    max_distance: propTypes.number,
    speed: propTypes.number,
  })).isRequired,
  selected: propTypes.arrayOf(propTypes.shape({
    planet: propTypes.string,
    vehicle: propTypes.string,
  })).isRequired,
  index: propTypes.number.isRequired,
  choosePlanet: propTypes.func.isRequired,
  chooseVehicle: propTypes.func.isRequired,
};

SingleValue.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: propTypes.object.isRequired,
};
export default Selector;

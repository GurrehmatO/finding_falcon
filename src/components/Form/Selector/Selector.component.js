import React, { Component } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { DESTINATION, CONFIRM } from '../../../constants/strings';
import './Selector.component.scss';

class Selector extends Component {
  state = {
    selectedPlanet: '',
    selectedVehicle: '',
  };

  render() {
    const {
      planets, vehicles, selection, makeSelection,
    } = this.props;
    const { selectedPlanet, selectedVehicle } = this.state;
    const availablePlanets = planets.filter(
      planet => selection.planetNames.indexOf(planet.name) === -1,
    );
    const availableVehicles = vehicles.map((vehicleType) => {
      const count = vehicleType.total_no - selection.vehicleNames.reduce(
        (total, name) => ((name === vehicleType.name) ? total + 1 : total), 0,
      );
      return {
        value: vehicleType.name,
        label: `${vehicleType.name} (${count})`,
        isDisabled: (count <= 0) || ((selectedPlanet !== '') && vehicleType.max_distance < planets
          .find(planet => ((planet.name === selectedPlanet) ? planet : undefined)).distance),
      };
    });
    return (
      <section className="selector">
        <span>{DESTINATION}</span>
        <div className="dropdown">
          <Select
            options={availablePlanets.map(({ name }) => ({
              value: name,
              label: name,
            }))}
            onChange={option => this.setState({ selectedPlanet: option.value })}
          />
        </div>
        {
          (selectedPlanet !== '') && (
            <div className="dropdown">
              <Select
                options={availableVehicles}
                onChange={option => this.setState({ selectedVehicle: option.value })}
              />
            </div>
          )
        }
        <Button
          disabled={(selectedPlanet === '') || (selectedVehicle === '')}
        >
          {`${CONFIRM} ${DESTINATION}`}
        </Button>
      </section>
    );
  }
}

export default Selector;

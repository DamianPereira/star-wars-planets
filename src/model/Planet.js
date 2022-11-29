import { types } from 'mobx-state-tree';

const PlanetPlain = types.model({
  name: types.string,
  climate: types.array(types.string),
  terrain: types.array(types.string),
  surface_water: types.number,
  diameter: types.integer,
});

export const Planet = types.snapshotProcessor(PlanetPlain, {
  preProcessor(planet) {
    return {
      name: planet.name,
      climate: planet.climate.split(',').map((climate) => climate.trim()),
      terrain: planet.terrain.split(',').map((climate) => climate.trim()),
      surface_water: parseInt(planet.surface_water),
      diameter: parseInt(planet.diameter),
    };
  },
  postProcessor(planet) {
    return {
      name: planet.name,
      climate: planet.climate.join(','),
      terrain: planet.terrain.join(','),
      surface_water: planet.surface_water.toString(),
      diameter: planet.diameter.toString(),
    };
  },
});

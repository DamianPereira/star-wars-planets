import { types } from 'mobx-state-tree';

const PlanetApi = types.model({
  name: types.string,
  climate: types.array(types.string),
  terrain: types.array(types.string),
  surface_water: types.number,
  diameter: types.maybeNull(types.integer),
});

export const Planet = types.snapshotProcessor(PlanetApi, {
  preProcessor(planet) {
    return {
      name: planet.name,
      climate: planet.climate.split(',').map((climate) => climate.trim()),
      terrain: planet.terrain.split(',').map((climate) => climate.trim()),
      surface_water: parseInt(planet.surface_water),
      diameter: typeof planet.diameter !== 'number' ? null : parseInt(planet.diameter),
    };
  },
});

import { types } from 'mobx-state-tree';

export const Planet = types
  .model({
    name: types.string,
    climate: types.string,
    terrain: types.string,
    surface_water: types.string,
    diameter: types.union(types.string, types.maybeNull(types.integer)),
    residents: types.array(types.string),
    url: types.string,
  })
  .views((self) => ({
    get processedPlanet() {
      return {
        name: self.name,
        climate: self.climate.split(',').map((climate) => climate.trim()),
        terrain: self.terrain.split(',').map((climate) => climate.trim()),
        surface_water: parseInt(self.surface_water),
        diameter: typeof self.diameter !== 'number' ? null : parseInt(self.planet.diameter),
        residents: self.residents,
        url: self.url,
      };
    },
  }));

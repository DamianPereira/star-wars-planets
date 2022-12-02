import { types } from 'mobx-state-tree';

export const Planet = types
  .model('Planet', {
    name: types.string,
    climate: types.string,
    terrain: types.string,
    surface_water: types.string,
    diameter: types.union(types.string, types.maybeNull(types.integer)),
    residents: types.array(types.string),
    url: types.identifier,
    rotation_period: types.string,
    orbital_period: types.string,
    gravity: types.string,
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
        rotation_period: self.rotation_period,
        orbital_period: self.orbital_period,
        gravity: self.gravity,
      };
    },
  }));

import { swapiEndpoint } from '../services/PlanetService';

export const EdgePlanetMock = {
  name: '🪐EdgePlanet with a long name 🪐',
  rotation_period: '23',
  orbital_period: '304',
  diameter: 'unknown',
  climate: 'arid, rocky,temperate',
  terrain: 'desert, cityscape',
  gravity: '1 standard',
  surface_water: '56',
  population: '100000000000000',
  residents: [`${swapiEndpoint}/people/43/`, `${swapiEndpoint}/people/62/`],
  films: [
    `${swapiEndpoint}/films/1/`,
    `${swapiEndpoint}/films/3/`,
    `${swapiEndpoint}/films/4/`,
    `${swapiEndpoint}/films/5/`,
    `${swapiEndpoint}/films/6/`,
  ],
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: `${swapiEndpoint}/planets/80/`,
};

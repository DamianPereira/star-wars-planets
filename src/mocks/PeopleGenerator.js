import { swapiEndpoint } from '../services/PlanetService';

export const PeopleGenerator = (id) => ({
  name: `Luke Skywalker ${id}`,
  url: `${swapiEndpoint}/people/${id}/`,
  homeworld: 'https://swapi.py4e.com/api/planets/1/',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
});

import { swapiEndpoint } from '../services/PlanetService';

export const PeopleGenerator = (id) => ({
  name: `Luke Skywalker ${id}`,
  url: `${swapiEndpoint}/people/${id}`,
});

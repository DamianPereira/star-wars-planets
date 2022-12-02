export const swapiEndpoint = 'https://swapi.py4e.com/api';

export class PlanetService {
  static async fetchPlanets(page) {
    const planets = await fetch(`${swapiEndpoint}/planets?` + new URLSearchParams({ page }));
    return await planets.json();
  }
  static async fetchPlanet({ planetUrl, id }) {
    const planets = await fetch(planetUrl || `${swapiEndpoint}/planets/${id}`);
    return await planets.json();
  }
  static async fetchPeople({ peopleUrl, id }) {
    const planets = await fetch(peopleUrl || `${swapiEndpoint}/people/${id}`);
    return await planets.json();
  }
}

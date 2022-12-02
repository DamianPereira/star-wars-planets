export const swapiEndpoint = 'https://swapi.py4e.com';

export class PlanetService {
  static async fetchPlanets(page) {
    const planets = await fetch(`${swapiEndpoint}/api/planets?` + new URLSearchParams({ page }));
    return await planets.json();
  }
  static async fetchPlanet({ planetUrl, id }) {
    const planets = await fetch(planetUrl || `${swapiEndpoint}/api/planets/${id}`);
    return await planets.json();
  }
  static async fetchPeople({ residentUrl, id }) {
    const planets = await fetch(residentUrl || `${swapiEndpoint}/api/people/${id}`);
    return await planets.json();
  }
}

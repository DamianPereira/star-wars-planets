export class PlanetService {
  static async fetchPlanets(page) {
    const planets = await fetch('https://swapi.dev/api/planets?' + new URLSearchParams({ page }));
    return await planets.json();
  }
  static async fetchPlanet(planetUrl) {
    const planets = await fetch(planetUrl);
    return await planets.json();
  }
}

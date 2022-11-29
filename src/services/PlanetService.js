export class PlanetService {
  static async fetchPlanets() {
    const planets = await fetch('https://swapi.dev/api/planets');
    return (await planets.json()).results;
  }
}

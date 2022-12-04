export const swapiEndpoint = 'https://swapi.py4e.com/api';

export class PlanetService {
  static async fetchAllPlanets() {
    let planets = [];
    let nextUrl = `${swapiEndpoint}/planets`;

    while (nextUrl) {
      const response = await fetch(nextUrl);
      const responseJson = await response.json();
      planets.push(...responseJson.results);
      nextUrl = responseJson.next;
    }

    return planets;
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

import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';
import { PlanetService } from '../services/PlanetService';
import { values } from 'mobx';

export const RootStore = types
  .model('RootStore', {
    planets: types.array(Planet),
    planetState: types.optional(
      types.enumeration('planetState', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    selectedPlanet: types.maybeNull(types.reference(Planet)),
  })
  .views((self) => ({
    get planetsProcessed() {
      return self.planets.map((planet) => planet.processedPlanet);
    },
  }))
  .actions((self) => ({
    initializePlanets: flow(function* initializePlanets() {
      if (self.planetState === 'loading') {
        return;
      }
      self.selectedPlanet = null;
      self.planets = [];
      self.planetState = 'loading';
      try {
        let page = 1;
        let morePages = true;
        while (morePages) {
          const planetRequest = yield PlanetService.fetchPlanets(page);
          self.planets.push(...planetRequest.results);
          morePages = planetRequest.next !== null;
          page++;
        }
        self.planetState = 'done';
      } catch (error) {
        console.error('Failed to fetch planets', error);
        self.planetState = 'error';
      }
    }),
    setSelectedPlanet: flow(function* setSelectedPlanet(planetUrl) {
      const existingPlanet = values(self.planets).find((planet) => planet.url === planetUrl);
      if (!existingPlanet) {
        self.planets = [yield PlanetService.fetchPlanet(planetUrl)];
      }
      self.selectedPlanet = planetUrl;
    }),
  }));

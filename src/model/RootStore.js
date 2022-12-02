import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';
import { PlanetService } from '../services/PlanetService';
import { values } from 'mobx';
import { People } from './People';

export const RootStore = types
  .model('RootStore', {
    planets: types.array(Planet),
    state: types.optional(
      types.enumeration('state', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    selectedPlanet: types.maybeNull(types.reference(Planet)),
    selectedPlanetResidents: types.array(People),
  })
  .views((self) => ({
    get planetsProcessed() {
      return self.planets.map((planet) => planet.processedPlanet);
    },
  }))
  .actions((self) => ({
    initializePlanets: flow(function* initializePlanets() {
      if (self.state === 'loading' || self.planets.length > 0) {
        return;
      }
      self.selectedPlanet = null;
      self.planets = [];
      self.state = 'loading';
      try {
        let page = 1;
        let morePages = true;
        while (morePages) {
          const planetRequest = yield PlanetService.fetchPlanets(page);
          self.planets.push(...planetRequest.results);
          morePages = planetRequest.next !== null;
          page++;
        }
        self.state = 'done';
      } catch (error) {
        console.error('Failed to fetch planets', error);
        self.state = 'error';
      }
    }),
    setSelectedPlanet: flow(function* setSelectedPlanet(planetUrl) {
      if (self.state === 'loading') {
        return;
      }
      self.selectedPlanet = null;
      self.selectedPlanetResidents = [];
      self.state = 'loading';
      const existingPlanet = values(self.planets).find((planet) => planet.url === planetUrl);
      if (!existingPlanet) {
        try {
          self.planets = [yield PlanetService.fetchPlanet({ planetUrl })];
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.state = 'error';
        }
      }
      self.selectedPlanet = planetUrl;
      for (const residentUrl of self.selectedPlanet.residents) {
        try {
          self.selectedPlanetResidents.push(yield PlanetService.fetchPeople({ residentUrl }));
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.state = 'error';
        }
      }
      self.state = 'done';
    }),
  }));

import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';
import { PlanetService } from '../services/PlanetService';

export const RootStore = types
  .model({
    planets: types.array(Planet),
    planetState: types.optional(
      types.enumeration('planetState', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
  })
  .actions((self) => ({
    initializePlanets: flow(function* fetchPlanets() {
      if (self.planetState === 'loading') {
        return;
      }
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
    afterCreate() {
      self.initializePlanets();
    },
  }));

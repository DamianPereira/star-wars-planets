import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';
import { PlanetService } from '../services/PlanetService';

const RootStore = types
  .model({
    planets: types.array(Planet),
    planetState: types.optional(
      types.enumeration('planetState', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
  })
  .actions((self) => ({
    fetchPlanets: flow(function* fetchPlanets() {
      self.planets = [];
      self.planetState = 'loading';
      try {
        let page = 1;
        while (page) {
          const planetRequest = yield PlanetService.fetchPlanets(page);
          self.planets.push(...planetRequest.results);
          page = planetRequest.next !== null ? page + 1 : 0;
        }
        self.planetState = 'done';
      } catch (error) {
        console.error('Failed to fetch planets', error);
        self.planetState = 'error';
      }
    }),
  }));
export const store = RootStore.create({});

import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';

const RootStore = types.model({ planets: types.array(Planet) }).actions((self) => ({
  fetchPlanets: flow(function* fetchPlanets() {
    console.log('executing');
    self.planets = [];
    self.state = 'pending';
    try {
      const planetsRequest = yield fetch('https://swapi.dev/api/planets');
      const planetsJson = yield planetsRequest.json();
      self.planets = planetsJson.results;
      self.state = 'done';
    } catch (error) {
      console.error('Failed to fetch planets', error);
      self.state = 'error';
    }
  }),
}));
export const store = RootStore.create({});

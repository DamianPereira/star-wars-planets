import { flow, types } from 'mobx-state-tree';
import { Planet } from './Planet';
import { PlanetService } from '../services/PlanetService';
import { values } from 'mobx';
import { People } from './People';

export const RootStore = types
  .model('RootStore', {
    planets: types.array(Planet),
    initializePlanetsState: types.optional(
      types.enumeration('state', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    setSelectedPlanetState: types.optional(
      types.enumeration('state', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    setSelectedResidentState: types.optional(
      types.enumeration('state', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    selectedPlanet: types.maybeNull(types.reference(Planet)),
    selectedPlanetResidents: types.array(People),
    selectedResident: types.maybeNull(types.reference(People)),
  })
  .views((self) => ({
    get planetsProcessed() {
      return self.planets.map((planet) => planet.processedPlanet);
    },
  }))
  .actions((self) => ({
    initializePlanets: flow(function* initializePlanets() {
      if (self.initializePlanetsState === 'loading') {
        return;
      }
      self.planets = [];
      self.initializePlanetsState = 'loading';
      try {
        let page = 1;
        let morePages = true;
        while (morePages) {
          const planetRequest = yield PlanetService.fetchPlanets(page);
          self.planets.push(...planetRequest.results);
          morePages = planetRequest.next !== null;
          page++;
        }
        self.initializePlanetsState = 'done';
      } catch (error) {
        console.error('Failed to fetch planets', error);
        self.initializePlanetsState = 'error';
      }
    }),
    setSelectedPlanet: flow(function* setSelectedPlanet(planetUrl) {
      if (self.setSelectedPlanetState === 'loading') {
        return;
      }
      self.selectedPlanet = null;
      self.selectedPlanetResidents = [];
      self.setSelectedPlanetState = 'loading';
      const existingPlanet = values(self.planets).find((planet) => planet.url === planetUrl);
      if (!existingPlanet) {
        try {
          self.planets = [yield PlanetService.fetchPlanet({ planetUrl })];
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.setSelectedPlanetState = 'error';
        }
      }
      self.selectedPlanet = planetUrl;
      for (const residentUrl of self.selectedPlanet.residents) {
        try {
          self.selectedPlanetResidents.push(
            yield PlanetService.fetchPeople({ peopleUrl: residentUrl })
          );
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.setSelectedPlanetState = 'error';
        }
      }
      self.setSelectedPlanetState = 'done';
    }),
    setSelectedResident: flow(function* setSelectedResident(residentUrl) {
      if (self.setSelectedResidentState === 'loading') {
        return;
      }
      self.selectedResident = null;
      self.setSelectedResidentState = 'loading';
      const existingResident = values(self.selectedPlanetResidents).find(
        (resident) => resident.url === residentUrl
      );
      if (!existingResident) {
        try {
          self.selectedPlanetResidents = [
            yield PlanetService.fetchPeople({ peopleUrl: residentUrl }),
          ];
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.setSelectedResidentState = 'error';
        }
      }
      self.selectedResident = residentUrl;
      self.setSelectedResidentState = 'done';
    }),
    clearSelectedPlanet: () => {
      self.selectedPlanet = null;
    },
    clearSelectedResident: () => {
      self.selectedResident = null;
    },
  }));

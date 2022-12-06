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
    getSelectedPlanetResidentsState: types.optional(
      types.enumeration('state', ['unstarted', 'loading', 'done', 'error']),
      'unstarted'
    ),
    selectedPlanet: types.maybeNull(types.reference(Planet)),
    selectedPlanetResidents: types.array(People),
    selectedResident: types.maybeNull(types.reference(People)),
    planetFilter: '',
  })
  .views((self) => ({
    get planetsProcessed() {
      return self.planets
        .map((planet) => planet.processedPlanet)
        .filter((planet) => planet.name.toLowerCase().includes(self.planetFilter.toLowerCase()));
    },
  }))
  .actions((self) => ({
    initializePlanets: flow(function* initializePlanets() {
      if (self.initializePlanetsState === 'loading' || self.planets.length > 1) {
        return;
      }
      self.planets = [];
      self.initializePlanetsState = 'loading';
      try {
        self.planets = yield PlanetService.fetchAllPlanets();
        self.initializePlanetsState = 'done';
      } catch (error) {
        console.error('Failed to fetch planets', error);
        self.initializePlanetsState = 'error';
      }
    }),
    setSelectedPlanet: flow(function* setSelectedPlanet(planetUrl, callback) {
      if (self.setSelectedPlanetState === 'loading') {
        return;
      }
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
      self.setSelectedPlanetState = 'done';
      callback && callback();
    }),
    getSelectedPlanetResidents: flow(function* getSelectedPlanetResidents() {
      if (self.getSelectedPlanetResidentsState === 'loading') {
        return;
      }
      self.getSelectedPlanetResidentsState = 'loading';
      self.selectedPlanetResidents = [];
      for (const residentUrl of self.selectedPlanet.residents) {
        try {
          self.selectedPlanetResidents.push(
            yield PlanetService.fetchPeople({ peopleUrl: residentUrl })
          );
        } catch (error) {
          console.error('Failed to fetch planets', error);
          self.getSelectedPlanetResidentsState = 'error';
        }
      }
      self.getSelectedPlanetResidentsState = 'done';
    }),
    setSelectedResident: flow(function* setSelectedResident(residentUrl, callback) {
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
      callback && callback();
    }),
    clearSelectedPlanet: () => {
      self.selectedPlanet = null;
    },
    clearSelectedResident: () => {
      self.selectedResident = null;
    },
    updatePlanetFilter: (newTerm) => {
      self.planetFilter = newTerm;
    },
  }));

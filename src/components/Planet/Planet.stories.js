import { Planet } from './Planet';
import { Planet as PlanetModel } from '../../model/Planet';
import { TatooineMock } from '../../mocks/TatooineMock';
import { EdgePlanetMock } from '../../mocks/EdgePlanetMock';

const StoryConfig = {
  component: Planet,
};

export default StoryConfig;

export const tatooine = {
  args: {
    planet: PlanetModel.create(TatooineMock).processedPlanet,
  },
};

export const EdgePlanet = {
  args: {
    planet: PlanetModel.create(EdgePlanetMock).processedPlanet,
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

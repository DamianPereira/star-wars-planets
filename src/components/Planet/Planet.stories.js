import { Planet } from './Planet';
import { TatooineMock } from '../../mocks/TatooineMock';
import { EdgePlanetMock } from '../../mocks/EdgePlanetMock';
import { preProcessPlanet } from '../../model/Planet';

const StoryConfig = {
  component: Planet,
};

export default StoryConfig;

export const tatooine = {
  args: {
    planet: preProcessPlanet(TatooineMock),
  },
};

export const EdgePlanet = {
  args: {
    planet: preProcessPlanet(EdgePlanetMock),
  },
};

export const Loading = {
  args: {
    loading: true,
  },
};

import { ResidentList } from './ResidentList';
import { TatooineMock } from '../../mocks/TatooineMock';
import { PeopleGenerator } from '../../mocks/PeopleGenerator';

export default {
  component: ResidentList,
};

export const Default = {
  args: {
    selectedPlanet: TatooineMock,
    selectedPlanetResidents: [PeopleGenerator(1), PeopleGenerator(2), PeopleGenerator(3)],
  },
};

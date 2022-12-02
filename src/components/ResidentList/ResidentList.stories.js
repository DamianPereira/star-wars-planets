import { ResidentList } from './ResidentList';
import { TatooineMock } from '../../mocks/TatooineMock';
import { LukeSkywalker } from '../../mocks/LukeSkywalker';

export default {
  component: ResidentList,
};

export const Default = {
  args: {
    selectedPlanet: TatooineMock,
    selectedPlanetResidents: [LukeSkywalker, LukeSkywalker, LukeSkywalker],
  },
};

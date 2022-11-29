import { Globe } from './Globe';

export default {
  component: Globe,
};

export const AridMountainsNoWater = {
  args: {
    climates: ['arid'],
    terrains: ['mountains'],
    surface_water: 1,
  },
};

export const AridRockyCityLittleWater = {
  args: {
    climates: ['arid', 'rocky'],
    terrains: ['cityscape'],
    surface_water: 30,
  },
};

export const TemperateRockyCitySomeWater = {
  args: {
    climates: ['temperate'],
    terrains: ['cityscape', 'mountains'],
    surface_water: 60,
  },
};

export const FrozenIceCavesMountainsLotsOfWater = {
  args: {
    climates: ['frozen'],
    terrains: ['ice caves', 'mountains'],
    surface_water: 80,
  },
};

import { types } from 'mobx-state-tree';

export const Planet = types.model({
  name: types.string,
  diameter: types.string,
});

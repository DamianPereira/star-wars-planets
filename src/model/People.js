import { types } from 'mobx-state-tree';

export const People = types.model('People', {
  name: types.string,
  url: types.identifier,
});

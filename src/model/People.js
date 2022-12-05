import { types } from 'mobx-state-tree';

export const People = types.model('People', {
  name: types.string,
  url: types.identifier,
  homeworld: types.string,
  height: types.string,
  mass: types.string,
  hair_color: types.string,
  skin_color: types.string,
  eye_color: types.string,
  birth_year: types.string,
  gender: types.string,
});

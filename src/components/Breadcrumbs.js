import { Text } from './Text';
import { observer } from 'mobx-react-lite';

export const Breadcrumbs = observer(({ store }) => {
  const selectedPlanetText = store.selectedPlanet === null ? '' : ' > ' + store.selectedPlanet.name;
  return <Text>{'All Planets' + selectedPlanetText}</Text>;
});

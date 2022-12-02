import { Text } from './Text';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const Separator = () => (
  <span className="text-white font-distant-galaxy-symbols mr-2 text-xl">a</span>
);

export const Breadcrumbs = observer(({ store }) => {
  const selectedPlanetText = store.selectedPlanet === null ? '' : store.selectedPlanet.name;
  return (
    <div className="py-4 flex flex-row items-center">
      <Link to={'/'}>
        <Text label>All Planets</Text>
      </Link>
      <Separator />
      <Text label>{selectedPlanetText}</Text>
    </div>
  );
});

import { Text } from './Text';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { values } from 'mobx';
import { tryReference } from 'mobx-state-tree';

const Separator = () => (
  <span className="text-white font-distant-galaxy-symbols mr-2 text-xl">a</span>
);

export const Breadcrumbs = observer(({ store }) => {
  return (
    <div className="flex flex-row items-center">
      <Link to={'/'}>
        <Text label>All Planets</Text>
      </Link>
      {tryReference(() => store.selectedPlanet) && (
        <>
          <Separator />
          <Link to={`/planets/${encodeURIComponent(store.selectedPlanet.url)}`}>
            <Text label>{store.selectedPlanet.name}</Text>
          </Link>
        </>
      )}
      {tryReference(() => store.selectedResident) && (
        <>
          <Separator />
          <Text label>{store.selectedResident.name}</Text>
        </>
      )}
    </div>
  );
});

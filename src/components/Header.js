import { Breadcrumbs } from './Breadcrumbs';
import { observer } from 'mobx-react-lite';
import { Text } from './Text';

export const Header = observer(({ store }) => {
  const handleFilterChange = (e) => store.updatePlanetFilter(e.target.value);
  return (
    <div className="flex justify-between items-center">
      <Breadcrumbs store={store} />
      {!store.selectedPlanet && (
        <label>
          <Text label>Filter</Text>
          <input
            value={store.planetFilter}
            onChange={handleFilterChange}
            className="ml-2 text-white bg-transparent border border-white"
          />
        </label>
      )}
    </div>
  );
});

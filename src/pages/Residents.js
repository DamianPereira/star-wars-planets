import { useParams } from 'react-router-dom';
import { Text } from '../components/Text';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ResidentList } from '../components/ResidentList/ResidentList';

export const Residents = observer(({ store }) => {
  const { planetUrl } = useParams();

  useEffect(() => {
    store.setSelectedPlanet(planetUrl);
  }, [planetUrl, store]);

  if (store.selectedPlanet === null) {
    return null;
  }
  return store.setSelectedPlanetState === 'loading' ? (
    <Text>Loading...</Text>
  ) : (
    <ResidentList
      selectedPlanetResidents={store.selectedPlanetResidents}
      selectedPlanet={store.selectedPlanet}
    />
  );
});

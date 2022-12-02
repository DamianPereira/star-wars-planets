import { useParams } from 'react-router-dom';
import { Text } from '../components/Text';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const Residents = observer(({ store }) => {
  const { planetUrl } = useParams();

  useEffect(() => {
    store.setSelectedPlanet(planetUrl);
  }, [planetUrl, store]);

  return store.state === 'loading' || store.selectedPlanet === null ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Text header>Residents of {store.selectedPlanet.name}</Text>
      <ul>
        {store.selectedPlanetResidents.map((resident, index) => (
          <li key={resident.name + index}>
            <Text>{resident.name}</Text>
          </li>
        ))}
        {store.selectedPlanetResidents.length === 0 && <Text>No residents!</Text>}
      </ul>
    </>
  );
});

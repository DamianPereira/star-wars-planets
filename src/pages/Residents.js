import { useParams } from 'react-router-dom';
import { Text } from '../components/Text';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const Residents = observer(({ store }) => {
  const { planetUrl } = useParams();

  useEffect(() => {
    store.setSelectedPlanet(planetUrl);
  }, [planetUrl, store]);

  return store.selectedPlanet === null ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Text header>Residents of {store.selectedPlanet.name}</Text>
      <ul>
        {values(store.selectedPlanet.residents).map((resident) => (
          <li key={resident}>
            <Text>{resident}</Text>
          </li>
        ))}
      </ul>
    </>
  );
});

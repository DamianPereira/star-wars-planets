import { useParams } from 'react-router-dom';
import { Text } from '../components/Text';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';

export const Residents = observer(({ store }) => {
  const { planetUrl } = useParams();
  const planet = values(store.planets).find((planet) => planet.url === planetUrl);
  return planet === undefined ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Text header>Residents of {planet.name}</Text>
      <ul>
        {values(planet.residents).map((resident) => (
          <li key={resident}>
            <Text>{resident}</Text>
          </li>
        ))}
      </ul>
    </>
  );
});

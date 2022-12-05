import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from '../components/Text';

export const ResidentInfo = observer(({ store }) => {
  const { residentUrl } = useParams();

  useEffect(() => {
    store.setSelectedResident(residentUrl, () => {
      store.setSelectedPlanet(store.selectedResident.homeworld);
    });
  }, [residentUrl, store]);

  return (
    store.selectedResident && (
      <div aria-label={store.selectedResident.name}>
        <Text header className="mt-6 mb-2">
          {store.selectedResident.name}
        </Text>
        <div className="flex">
          <Text label>Name</Text>
          <Text>{store.selectedResident.name}</Text>
        </div>
      </div>
    )
  );
});

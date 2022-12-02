import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from '../components/Text';

export const ResidentInfo = observer(({ store }) => {
  const { residentUrl } = useParams();
  useEffect(() => {
    store.setSelectedResident(residentUrl);
  }, [residentUrl, store]);
  return store.selectedResident && <Text header>Name: {store.selectedResident.name}</Text>;
});

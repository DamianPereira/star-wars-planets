import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from '../components/Header';
import { ResidentCard } from '../components/ResidentCard/ResidentCard';

export const ResidentInfo = observer(({ store }) => {
  const { residentUrl } = useParams();
  const isLoading =
    store.setSelectedResidentState === 'loading' || store.setSelectedPlanetState === 'loading';
  useEffect(() => {
    store.setSelectedResident(residentUrl, () => {
      store.setSelectedPlanet(store.selectedResident.homeworld);
    });
  }, [residentUrl, store]);

  return (
    <>
      <Header store={store} />
      <ResidentCard resident={store.selectedResident} loading={isLoading} />
    </>
  );
});

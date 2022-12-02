import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ResidentList } from '../components/ResidentList/ResidentList';

export const Residents = observer(({ store }) => {
  const { planetUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    store.setSelectedPlanet(planetUrl);
    store.clearSelectedResident();
  }, [planetUrl, store]);

  const handleClickResident = (residentUrl) => {
    navigate(`/residents/${encodeURIComponent(residentUrl)}`);
  };

  return (
    <ResidentList
      selectedPlanetResidents={store.selectedPlanetResidents}
      selectedPlanet={store.selectedPlanet}
      handleClickResident={handleClickResident}
      loading={store.setSelectedPlanetState === 'loading'}
    />
  );
});

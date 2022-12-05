import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ResidentList } from '../components/ResidentList/ResidentList';
import { values } from 'mobx';

export const PlanetResidents = observer(({ store }) => {
  const { planetUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    store.clearSelectedResident();
    store.setSelectedPlanet(planetUrl, () => {
      store.getSelectedPlanetResidents();
    });
  }, [planetUrl, store]);

  const handleClickResident = (residentUrl) => {
    navigate(`/residents/${encodeURIComponent(residentUrl)}`);
  };
  // console.log(values(store.selectedPlanetResidents).map((resident) => resident.name));
  return (
    <ResidentList
      selectedPlanetResidents={values(store.selectedPlanetResidents)}
      selectedPlanet={store.selectedPlanet}
      handleClickResident={handleClickResident}
      loading={store.getSelectedPlanetResidentsState === 'loading'}
    />
  );
});

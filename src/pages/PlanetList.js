import { observer } from 'mobx-react-lite';
import { Planet } from '../components/Planet/Planet';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { onSnapshot } from 'mobx-state-tree';

export const PlanetList = observer(({ store }) => {
  // onSnapshot(store, (snapshot) => console.log(snapshot));
  const navigate = useNavigate();
  const handleClickResidents = (planetUrl) => {
    navigate(`/planets/${encodeURIComponent(planetUrl)}`);
  };

  useEffect(() => {
    store.clearSelectedResident();
    store.clearSelectedPlanet();
    store.initializePlanets();
  }, [store]);

  return (
    <div className="grid grid-cols-[minmax(0,_800px)] justify-center xl:grid-cols-[minmax(0,_800px)_minmax(0,_800px)] gap-8 p-6">
      {store.planetsProcessed.map((planet) => (
        <Planet planet={planet} key={planet.name} onClickResidents={handleClickResidents} />
      ))}
      {store.initializePlanetsState === 'loading' &&
        Array.from(Array(10)).map((_, i) => <Planet loading key={i} />)}
    </div>
  );
});

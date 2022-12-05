import { observer } from 'mobx-react-lite';
import { Planet } from '../components/Planet/Planet';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/Header';
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
    <>
      <Header store={store} showFilter />
      <div className="grid grid-cols-[minmax(0,_400px)] md:grid-cols-[minmax(0,_800px)] justify-center xl:grid-cols-[minmax(0,_800px)_minmax(0,_800px)] gap-8 py-6">
        {store.planetsProcessed.map((planet) => (
          <Planet planet={planet} key={planet.name} onClickResidents={handleClickResidents} />
        ))}
        {store.initializePlanetsState === 'loading' &&
          Array.from(Array(10)).map((_, i) => <Planet loading key={i} />)}
      </div>
    </>
  );
});

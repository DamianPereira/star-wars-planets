import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { Planet } from '../components/Planet/Planet';
// import { onSnapshot } from 'mobx-state-tree';

export const PlanetList = observer(({ store }) => {
  // onSnapshot(store, (snapshot) => console.log(snapshot));
  return (
    <div className="grid grid-cols-[minmax(0,_800px)] justify-center xl:grid-cols-[minmax(0,_800px)_minmax(0,_800px)] gap-8 p-6">
      {values(store.planets).map((planet) => (
        <Planet planet={planet} key={planet.name} />
      ))}
      {store.planetState === 'loading' &&
        Array.from(Array(10)).map((_, i) => <Planet loading key={i} />)}
    </div>
  );
});

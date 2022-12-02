import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { Planet } from './components/Planet/Planet';

export const PlanetList = observer(({ store }) => {
  const isLoading = store.planetState === 'loading';
  return (
    <div className="bg-black min-h-screen flex flex-col justify-center">
      <div className="flex justify-center items-center mb-5">
        <button
          className="border-white border-2 p-2 text-white"
          onClick={() => store.fetchPlanets()}
        >
          Fetch Planets
        </button>
        <h1 className="ml-3 text-white">State: {store.planetState}</h1>
      </div>
      <div className="m-auto max-w-screen-xl grid grid-cols-1 xl:grid-cols-2 gap-8 p-6">
        {values(store.planets).map((planet) => (
          <Planet planet={planet} key={planet.name} />
        ))}
        {isLoading && Array.from(Array(10)).map((_, i) => <Planet loading key={i} />)}
      </div>
    </div>
  );
});

import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { onSnapshot } from 'mobx-state-tree';
import { Planet } from './components/Planet/Planet';

const App = observer(({ store }) => {
  // onSnapshot(store, (snapshot) => console.log(snapshot));

  return (
    <div className="bg-black min-h-screen">
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
      </div>
    </div>
  );
});

export default App;

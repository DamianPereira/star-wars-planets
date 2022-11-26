import Card from './components/Card';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';
import { onSnapshot } from 'mobx-state-tree';

const App = observer((props) => {
  onSnapshot(props.store, (snapshot) => console.log(snapshot));

  return (
    <>
      <button onClick={() => props.store.fetchPlanets()}>Fetch Planets</button>
      <div className="gap-8 bg-black overflow-auto columns-2 min-h-screen gap-8">
        {values(props.store.planets).map((planet) => (
          <Card className="m-3" key={planet.name}>
            <h1 className="text-white">{planet.name}</h1>
          </Card>
        ))}
      </div>
    </>
  );
});

export default App;

import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { PlanetList } from './PlanetList';

const App = observer(({ store }) => {
  return (
    <Routes>
      <Route path="/" element={<PlanetList store={store} />} />
    </Routes>
  );
});

export default App;

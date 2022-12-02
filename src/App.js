import { Route, Routes } from 'react-router-dom';
import { PlanetList } from './pages/PlanetList';
import { Residents } from './pages/Residents';
import { Breadcrumbs } from './components/Breadcrumbs';

const App = ({ store }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-screen-xl m-auto">
        <Breadcrumbs store={store} />
        <Routes>
          <Route path="/" element={<PlanetList store={store} />} />
          <Route path="/:planetUrl" element={<Residents store={store} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

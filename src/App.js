import { Route, Routes } from 'react-router-dom';
import { PlanetList } from './pages/PlanetList';
import { Residents } from './pages/Residents';

const App = ({ store }) => {
  return (
    <div className="bg-black min-h-screen">
      <Routes>
        <Route path="/" element={<PlanetList store={store} />} />
        <Route path="/:planetUrl" element={<Residents store={store} />} />
      </Routes>
    </div>
  );
};

export default App;

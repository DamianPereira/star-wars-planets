import { Route, Routes } from 'react-router-dom';
import { PlanetList } from './pages/PlanetList';
import { Residents } from './pages/Residents';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ResidentInfo } from './pages/ResidentInfo';

const App = ({ store }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-screen-xl m-auto">
        <Breadcrumbs store={store} />
        <Routes>
          <Route path="/" element={<PlanetList store={store} />} />
          <Route path="/planets/:planetUrl" element={<Residents store={store} />} />
          <Route path="/residents/:residentUrl" element={<ResidentInfo store={store} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

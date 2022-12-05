import { Route, Routes } from 'react-router-dom';
import { PlanetList } from './pages/PlanetList';
import { PlanetResidents } from './pages/PlanetResidents';
import { ResidentInfo } from './pages/ResidentInfo';
import { Header } from './components/Header';

const App = ({ store }) => {
  return (
    <div className="bg-black min-h-screen px-4 pt-4">
      <div className="max-w-screen-xl m-auto">
        <Header store={store} />
        <Routes>
          <Route path="/" element={<PlanetList store={store} />} />
          <Route path="/planets/:planetUrl" element={<PlanetResidents store={store} />} />
          <Route path="/residents/:residentUrl" element={<ResidentInfo store={store} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

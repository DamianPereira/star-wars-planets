import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from '../components/Text';
import { Header } from '../components/Header';

const ResidentProperties = ({ resident, loading }) => {
  const fields = {
    Name: resident?.name,
    Height: resident?.height,
    Mass: resident?.mass,
    'Hair Color': resident?.hair_color,
    'Skin Color': resident?.skin_color,
    'Eye Color': resident?.eye_color,
    'Birth Year': resident?.birth_year,
    Gender: resident?.gender,
  };

  return (
    <div aria-label={resident?.name} className="flex flex-1 flex-col items-center">
      <div className="flex flex-col">
        <Text header className="mt-6 mb-2" loading={loading}>
          {resident?.name}
        </Text>
        {Object.keys(fields).map((label) => (
          <div key={label} className="flex justify-start">
            <Text className="whitespace-nowrap" loading={loading} label>
              {label}
            </Text>
            <Text className="min-w-full" loading={loading}>
              {fields[label]}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ResidentInfo = observer(({ store }) => {
  const { residentUrl } = useParams();
  const isLoading =
    store.setSelectedResidentState === 'loading' || store.setSelectedPlanetState === 'loading';
  useEffect(() => {
    store.setSelectedResident(residentUrl, () => {
      store.setSelectedPlanet(store.selectedResident.homeworld);
    });
  }, [residentUrl, store]);

  return (
    <>
      <Header store={store} />
      <ResidentProperties resident={store.selectedResident} loading={isLoading} />
    </>
  );
});

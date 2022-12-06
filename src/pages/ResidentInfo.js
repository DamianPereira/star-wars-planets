import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text } from '../components/Text';
import { Header } from '../components/Header';

const ResidentProperties = ({ resident, loading }) => {
  const fields = {
    Height: resident?.height,
    Mass: resident?.mass,
    'Hair Color': resident?.hair_color,
    'Skin Color': resident?.skin_color,
    'Eye Color': resident?.eye_color,
    'Birth Year': resident?.birth_year,
    Gender: resident?.gender,
  };

  return (
    <div aria-label={resident?.name} className="flex flex-1 flex-col items-center mt-8">
      <div className="flex flex-col aspect-video-vertical bg-star-wars-vertical pt-4 md:pt-0 md:aspect-video md:bg-star-wars-horizontal px-12 md:px-6 pb-8">
        <Text header className="mt-6 mb-2" loading={loading}>
          {resident?.name}
        </Text>
        <div className="flex flex-col items-center">
          <div>
            {Object.keys(fields).map((label) => (
              <div
                key={label}
                className="mt-4 md:mt-0 flex flex-1 justify-between border-b border-gray-200"
              >
                <Text className="flex-1 whitespace-nowrap" loading={loading} label>
                  {label}
                </Text>
                <Text className="flex-1 text-right" loading={loading}>
                  {fields[label]}
                </Text>
              </div>
            ))}
          </div>
        </div>
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

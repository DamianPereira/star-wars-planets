import { Text } from '../Text';
import classNames from 'classnames';

const Resident = ({ resident, handleClickResident, loading, ...props }) => (
  <button
    onClick={() => handleClickResident(resident?.url)}
    className={classNames(
      'relative p-8 flex justify-center items-center bg-star-wars-thin aspect-thin',
      {
        'animate-pulse': loading,
      }
    )}
    {...props}
  >
    <Text className="flex-1" label loading={loading}>
      {resident?.name}
    </Text>
  </button>
);

export const ResidentList = ({
  selectedPlanet,
  selectedPlanetResidents,
  handleClickResident,
  loadingPlanet,
  loadingResidents,
}) => {
  return (
    <>
      <Text header className="text-center w-fit m-auto mt-4" loading={loadingPlanet}>
        Residents of {selectedPlanet?.name}
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-screen-sm m-auto">
        {selectedPlanetResidents.map((resident, index) => (
          <Resident
            resident={resident}
            handleClickResident={handleClickResident}
            key={resident?.url}
          />
        ))}
        {!loadingPlanet && !loadingResidents && selectedPlanetResidents.length === 0 && (
          <div className="flex flex-1 justify-center col-span-2">
            <Text label className="ml-2">
              No residents!
            </Text>
          </div>
        )}
        {!loadingPlanet &&
          loadingResidents &&
          Array.from(Array(selectedPlanet.residents.length - selectedPlanetResidents.length)).map(
            (_, i) => <Resident aria-label="Loading" loading key={i} />
          )}
        }
      </div>
    </>
  );
};

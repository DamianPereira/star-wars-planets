import { Text } from '../Text';
import classNames from 'classnames';

const Resident = ({ resident, handleClickResident, loading, ...props }) => (
  <button
    onClick={() => handleClickResident(resident?.url)}
    className={classNames('relative border-star-wars p-8 flex justify-center items-center', {
      'animate-pulse': loading,
    })}
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
  loading,
}) => {
  return (
    <>
      <Text header className="text-center w-fit m-auto mt-4" loading={loading}>
        Residents of {selectedPlanet?.name}
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-screen-sm m-auto">
        {!loading &&
          selectedPlanetResidents.map((resident, index) => (
            <Resident
              resident={resident}
              handleClickResident={handleClickResident}
              key={resident?.url}
            />
          ))}
        {!loading && selectedPlanetResidents.length === 0 && (
          <div className="flex flex-1 justify-center col-span-2">
            <Text label className="ml-2">
              No residents!
            </Text>
          </div>
        )}
        {loading &&
          Array.from(Array(6)).map((_, i) => <Resident aria-label="Loading" loading key={i} />)}
        }
      </div>
    </>
  );
};

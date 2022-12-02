import { Text } from '../Text';

export const ResidentList = ({ selectedPlanet, selectedPlanetResidents }) => (
  <>
    <Text header className="text-center">
      Residents of {selectedPlanet.name}
    </Text>
    <div className="flex items-center justify-center">
      <ul className="grid grid-cols-2 gap-4 mt-4">
        {selectedPlanetResidents.map((resident, index) => (
          <li
            key={resident.name + index}
            className="relative border-star-wars p-8 flex justify-center items-center"
          >
            <Text label>{resident.name}</Text>
          </li>
        ))}
        {selectedPlanetResidents.length === 0 && <Text>No residents!</Text>}
      </ul>
    </div>
  </>
);

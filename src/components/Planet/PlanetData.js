import { Text } from '../Text';

export const PlanetData = ({ planet, loading }) => {
  const planetFields = {
    Diameter: planet?.diameter,
    Climate: planet?.climate.join(', '),
    Terrain: planet?.terrain.join(', '),
    'Surface Water': planet?.surface_water,
    'Rotation period': planet?.rotation_period,
    'Orbital period': planet?.orbital_period,
    Gravity: planet?.gravity,
  };
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="overflow-y-auto">
        {Object.keys(planetFields).map((label) => {
          if (planetFields[label]) {
            return (
              <div className="flex border-b border-gray-800" key={label}>
                <Text loading={loading} label>
                  {label}
                </Text>
                <Text className="flex-1" loading={loading}>
                  {planetFields[label]}
                </Text>
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

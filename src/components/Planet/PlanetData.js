import { Text } from '../Text';

export const PlanetData = ({ planet, loading }) => {
  const planetProperties = {
    Diameter: planet?.diameter,
    Climate: planet?.climate.join(', '),
    Terrain: planet?.terrain.join(', '),
  };
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="overflow-y-auto">
        {Object.keys(planetProperties).map((label) => {
          return (
            <div className="flex border-b border-gray-800" key={label}>
              <Text loading={loading} label>
                {label}
              </Text>
              <Text className="flex-1" loading={loading}>
                {planetProperties[label]}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

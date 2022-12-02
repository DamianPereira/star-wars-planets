import Card from '../Card';
import { Globe } from '../Globe/Globe';
import classNames from 'classnames';
import { Text } from '../Text';

const PlanetData = ({ planet, loading }) => {
  const planetProperties = {
    Diameter: planet?.diameter,
    Climate: planet?.climate.join(', '),
    Terrain: planet?.terrain.join(', '),
  };
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="overflow-y-auto">
        {Object.keys(planetProperties).map((label) => {
          console.log(label, planetProperties[label]);
          return (
            <div className="flex border-b border-gray-800 whitespace-nowrap" key={label}>
              <Text loading={loading} label>
                {label}
              </Text>
              <Text loading={loading}>{planetProperties[label]}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Planet = ({ planet, className, loading }) => {
  return (
    <Card
      className={classNames(
        'flex flex-col md:flex-row justify-between gap-4 aspect-video max-w-3xl',
        { 'animate-pulse': loading },
        className
      )}
    >
      <div className="flex flex-col items-center gap-y-4">
        <Text header loading={loading}>
          {planet?.name}
        </Text>
        <Globe loading={loading} climates={planet?.climate} surface_water={planet?.surface_water} />
      </div>
      <div className="border-white border-b -mx-10 my-10 w-100 md:border-r md:h-100 md:-my-10 md:mx-10" />
      <PlanetData planet={planet} loading={loading} />
    </Card>
  );
};

import Card from '../Card';
import { Globe } from '../Globe/Globe';
import classNames from 'classnames';
import { Text } from '../Text';
import { PlanetData } from './PlanetData';

export const Planet = ({ planet, className, loading, onClickResidents }) => (
  <Card
    aria-label={loading ? 'Loading' : planet?.name}
    className={classNames('justify-between', { 'animate-pulse': loading }, className)}
  >
    <div className="flex-1 flex flex-col items-stretch gap-y-4">
      <Text className="text-center overflow-y-auto overflow-x-hidden" header loading={loading}>
        {planet?.name}
      </Text>
      <Globe loading={loading} climates={planet?.climate} surface_water={planet?.surface_water} />
    </div>
    <div className="border-white border-b -mx-8 my-8 w-100 md:border-r md:h-100 md:-my-8 md:mx-8" />
    <div className="flex flex-1 flex-col gap-y-4 flex-1">
      <PlanetData planet={planet} loading={loading} />
      <button
        onClick={() => onClickResidents(planet?.url)}
        className="border border-gray-200 rounded-md p-2 font-distant-galaxy"
      >
        <Text loading={loading}>View Residents</Text>
      </button>
    </div>
  </Card>
);

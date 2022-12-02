import Card from '../Card';
import { Globe } from '../Globe/Globe';
import classNames from 'classnames';
import { Text } from '../Text';
import { useNavigate } from 'react-router-dom';
import { PlanetData } from './PlanetData';

export const Planet = ({ planet, className, loading }) => {
  const navigate = useNavigate();
  const handleClickResidents = (planetUrl) => () => {
    navigate(`/${encodeURIComponent(planetUrl)}`);
  };
  return (
    <Card
      aria-label={loading ? 'Loading' : planet?.name}
      className={classNames(
        'flex flex-col md:flex-row justify-between gap-4 aspect-video',
        { 'animate-pulse': loading },
        className
      )}
    >
      <div className="flex-1 flex flex-col items-stretch gap-y-4">
        <Text className="text-center" header loading={loading}>
          {planet?.name}
        </Text>
        <Globe loading={loading} climates={planet?.climate} surface_water={planet?.surface_water} />
      </div>
      <div className="border-white border-b -mx-10 my-10 w-100 md:border-r md:h-100 md:-my-10 md:mx-10" />
      <div className="flex flex-1 flex-col gap-y-4 flex-1">
        <PlanetData planet={planet} loading={loading} />
        <button
          onClick={handleClickResidents(planet?.url)}
          className="border border-gray-200 p-2 font-distant-galaxy"
        >
          <Text loading={loading}>View Residents</Text>
        </button>
      </div>
    </Card>
  );
};

import Card from '../Card';
import { Globe } from '../Globe/Globe';

export const Planet = ({ planet, className }) => {
  return (
    <Card className={className} key={planet.name}>
      <h1 className="text-white b">{planet.name}</h1>
      <Globe climates={planet.climate} surface_water={planet.surface_water}></Globe>
    </Card>
  );
};

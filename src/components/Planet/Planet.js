import Card from '../Card';
import { Globe } from '../Globe/Globe';
import classNames from 'classnames';

const PlanetData = ({ planet, skeleton }) => {
  const PlanetText = ({ header, label, className, children, ...props }) => {
    const Tag = header ? 'h1' : 'p';
    return (
      <Tag
        className={classNames(className, {
          'bg-gray-200 text-transparent rounded-md': skeleton,
          'font-bold text-2xl': header,
        })}
        {...props}
      >
        {label && <b className="font-bold">{label}: </b>}
        {children || '\u00A0'}
      </Tag>
    );
  };
  return (
    <div className="text-white flex-1 flex flex-col gap-2">
      <PlanetText header>{planet?.name}</PlanetText>
      <div className="overflow-y-scroll">
        <div className="columns-1 md:columns-2 gap-x-10">
          <PlanetText label="Diameter">{planet?.diameter}</PlanetText>
          <PlanetText label="Climate">{planet?.climate.join(', ')}</PlanetText>
          <PlanetText label="Terrain">{planet?.terrain.join(', ')}</PlanetText>
        </div>
      </div>
    </div>
  );
};

export const Planet = ({ planet, className, skeleton }) => {
  return (
    <Card
      className={classNames(
        'flex justify-between gap-4 aspect-video',
        { 'animate-pulse': skeleton },
        className
      )}
    >
      <Globe
        skeleton={skeleton}
        climates={planet?.climate}
        surface_water={planet?.surface_water}
      ></Globe>
      <PlanetData planet={planet} skeleton={skeleton} />
    </Card>
  );
};

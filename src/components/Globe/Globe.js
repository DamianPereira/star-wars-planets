import classNames from 'classnames';

const SurfaceWater = ({ surface_water }) => (
  <div
    className={classNames('absolute inset-0 -rotate-45', {
      'bg-[url(./images/75.svg)]': surface_water >= 75,
      'bg-[url(./images/50.svg)]': surface_water >= 50 && surface_water < 75,
      'bg-[url(./images/25.svg)]': surface_water >= 25 && surface_water < 50,
    })}
  ></div>
);

const ClimateSection = ({ climate }) => {
  return (
    <div
      className={classNames('flex-1', {
        'bg-amber-300': climate === 'arid',
        'bg-amber-800': climate === 'rocky',
        'bg-green-300': climate === 'temperate',
        'bg-cyan-300': climate === 'frozen',
        'bg-slate-200': climate === 'murky',
        'bg-green-800': climate === 'tropical',
      })}
    ></div>
  );
};

export const Globe = ({ climates, terrains, surface_water }) => {
  return (
    <div className="rounded-full h-40 w-40 flex flex-col overflow-hidden rotate-45">
      <SurfaceWater surface_water={surface_water} />
      {climates.map((climate) => (
        <ClimateSection key={climate} climate={climate} />
      ))}
    </div>
  );
};

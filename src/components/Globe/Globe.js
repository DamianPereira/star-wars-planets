import classNames from 'classnames';

const SurfaceWater = ({ surface_water }) => (
  <div
    className={classNames('absolute inset-0 -rotate-45', {
      'bg-[url(./images/60.svg)]': surface_water >= 60,
      'bg-[url(./images/30.svg)]': surface_water >= 30 && surface_water < 60,
      'bg-[url(./images/10.svg)]': surface_water >= 10 && surface_water < 30,
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
        'bg-green-400': climate === 'artificial temperate',
        'bg-cyan-500': climate === 'frigid',
        'bg-cyan-300': climate === 'frozen',
        'bg-cyan-200': climate === 'subartic',
        'bg-cyan-100': climate === 'artic',
        'bg-blue-400': climate === 'humid',
        'bg-blue-300': climate === 'moist',
        'bg-stone-400': climate === 'polluted',
        'bg-slate-200': climate === 'murky',
        'bg-slate-400': climate === 'windy',
        'bg-green-800': climate === 'tropical',
        'bg-red-500': climate === 'hot',
        'bg-red-300': climate === 'superheated',
        'bg-gray-900': climate === 'unknown',
      })}
    ></div>
  );
};

export const Globe = ({ loading, climates, surface_water }) => {
  return (
    <div
      className={classNames(
        'self-center rounded-full h-40 w-40 shrink-0 flex flex-col overflow-hidden rotate-45',
        { 'bg-gray-200': loading }
      )}
    >
      {!loading && <SurfaceWater surface_water={surface_water} />}
      {!loading && climates.map((climate) => <ClimateSection key={climate} climate={climate} />)}
    </div>
  );
};

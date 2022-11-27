import Card from './Card';

export const Planet = ({ planet }) => (
  <Card className="m-3" key={planet.name}>
    <h1 className="text-white">{planet.name}</h1>
  </Card>
);

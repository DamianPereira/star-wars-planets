import { Planet } from './Planet';

const StoryConfig = {
  component: Planet,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export default StoryConfig;

export const Default = { args: { planet: { name: 'Tattoine' } } };

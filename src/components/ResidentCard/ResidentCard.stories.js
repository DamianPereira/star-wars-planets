import { ResidentCard } from './ResidentCard';
import { PeopleGenerator } from '../../mocks/PeopleGenerator';

export default {
  component: ResidentCard,
};

export const Default = {
  args: {
    resident: PeopleGenerator(1),
    loading: false,
  },
};

export const Loading = {
  args: {
    resident: null,
    loading: true,
  },
};

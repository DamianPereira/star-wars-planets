import { server } from './mocks/server';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './model/RootStore';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { Tattoine } from './mocks/Tattoine';
import { EdgePlanet } from './mocks/EdgePlanet';

describe('App', () => {
  beforeEach(() => {
    server.use(
      rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            next: null,
            results: [Tattoine, EdgePlanet],
          })
        );
      })
    );
  });
  it('Fetches the planets when the button is clicked', async () => {
    render(<App store={store} />);
    const fetchButton = screen.getByRole('button', { name: 'Fetch Planets' });
    userEvent.click(fetchButton);
    const tatooine = await screen.findByText('Tatooine');
    expect(tatooine).toBeInTheDocument();
  });
  it('Renders emojis in the planet name', async () => {
    render(<App store={store} />);
    const fetchButton = screen.getByRole('button', { name: 'Fetch Planets' });
    userEvent.click(fetchButton);
    const edgePlanet = await screen.findByText('🪐EdgePlanet🪐');
    expect(edgePlanet).toBeInTheDocument();
  });
});

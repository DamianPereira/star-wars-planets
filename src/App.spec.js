import { server } from './mocks/server';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { TatooineMock } from './mocks/TatooineMock';
import { EdgePlanetMock } from './mocks/EdgePlanetMock';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { userEvent } from '@storybook/testing-library';
import { RootStore } from './model/RootStore';
import { handlers } from './mocks/handlers';

describe('App', () => {
  const renderApp = () => {
    return render(
      <React.StrictMode>
        <MemoryRouter>
          <App store={RootStore.create({})} />
        </MemoryRouter>
      </React.StrictMode>
    );
  };

  it('Renders 10 loading planets while page is loading', async () => {
    renderApp();
    const loading = await screen.findAllByLabelText('Loading');
    expect(loading.length).toBe(10);
  });

  it('Rendered a planet once by the time loading finishes', async () => {
    renderApp();
    const loading = await screen.findAllByLabelText('Loading');
    await waitForElementToBeRemoved(loading, { timeout: 4000 }).then(async () => {
      const tatooines = await screen.findAllByText('Tatooine');
      expect(tatooines.length).toBe(1);
    });
  });

  it('Renders a planet when the diameter is "unknown" and name has emojis', async () => {
    renderApp();
    const edgePlanet = await screen.findByText('🪐EdgePlanet with a long name 🪐');
    expect(edgePlanet).toBeInTheDocument();
  });

  it('Shows residents when clicking view residents', async () => {
    renderApp();
    const loading = await screen.findAllByLabelText('Loading');
    await waitForElementToBeRemoved(loading).then(async () => {
      const viewResidents = await screen.findAllByRole('button', { name: 'View Residents' });
      await userEvent.click(viewResidents[0]);
      const residents = await screen.findAllByText('https://');
      expect(residents.length).toBeGreaterThanOrEqual(1);
    });
  });
});

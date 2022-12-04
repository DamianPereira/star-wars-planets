import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { userEvent } from '@storybook/testing-library';
import { RootStore } from './model/RootStore';
import { TatooineMock } from './mocks/TatooineMock';

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

  const clickResidents = async () => {
    const loading = await screen.findAllByLabelText('Loading');
    await waitForElementToBeRemoved(loading);
    const viewResidents = await screen.findAllByRole('button', { name: 'View Residents' });
    await userEvent.click(viewResidents[0]);
  };

  it('Renders 10 loading planets while page is loading', async () => {
    renderApp();
    const loading = await screen.findAllByLabelText('Loading');
    expect(loading.length).toBe(10);
  });

  it('Rendered a planet once by the time loading finishes', async () => {
    renderApp();
    const loading = await screen.findAllByLabelText('Loading');
    await waitForElementToBeRemoved(loading);
    const tatooines = await screen.findAllByText('Tatooine');
    expect(tatooines.length).toBe(1);
  });

  it('Renders a planet when the diameter is "unknown" and name has emojis', async () => {
    renderApp();
    const edgePlanet = await screen.findByText('🪐EdgePlanet with a long name 🪐');
    expect(edgePlanet).toBeInTheDocument();
  });

  it('Shows a planet resident when clicking view residents', async () => {
    renderApp();
    await clickResidents();
    const resident = await screen.findByText('Luke Skywalker 1');
    expect(resident).toBeInTheDocument();
  });

  it('Does not re-load planets when navigating back after viewing residents', async () => {
    renderApp();
    await clickResidents();
    const AllPlanets = await screen.findByRole('link', { name: 'All Planets' });
    await userEvent.click(AllPlanets);
    expect(screen.queryAllByLabelText('Loading').length).toBe(0);
  });

  it('Loads one resident for each planet resident', async () => {
    renderApp();
    await clickResidents();
    const residents = await screen.findAllByText(/Luke Skywalker/);
    expect(residents.length).toBe(TatooineMock.residents.length);
  });
});

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { userEvent } from '@storybook/testing-library';
import { RootStore } from './model/RootStore';
import { TatooineMock } from './mocks/TatooineMock';

describe('App', () => {
  const renderApp = (initialUrl = '/') => {
    return render(
      <React.StrictMode>
        <MemoryRouter initialEntries={[initialUrl]}>
          <App store={RootStore.create({})} />
        </MemoryRouter>
      </React.StrictMode>
    );
  };

  const waitForLoading = async () => {
    const loading = await screen.findAllByLabelText('Loading');
    await waitForElementToBeRemoved(loading);
  };

  const clickTatooine = async () => {
    await waitForLoading();
    const viewResidents = await screen.findAllByRole('button', { name: 'View Residents' });
    await userEvent.click(viewResidents[0]);
    await waitForLoading();
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
    await clickTatooine();
    const resident = await screen.findByText('Luke Skywalker 1');
    expect(resident).toBeInTheDocument();
  });

  it('Does not re-load planets when navigating back after viewing residents', async () => {
    renderApp();
    await clickTatooine();
    const AllPlanets = await screen.findByRole('link', { name: 'All Planets' });
    await userEvent.click(AllPlanets);
    expect(screen.queryAllByLabelText('Loading').length).toBe(0);
  });

  it('Loads one resident for each planet resident', async () => {
    renderApp();
    await clickTatooine();
    const residents = await screen.findAllByText(/Luke Skywalker/);
    expect(residents.length).toBe(TatooineMock.residents.length);
  });

  it('Shows all planets again when clicking all planets in the breadcrumb', async () => {
    renderApp();
    await clickTatooine();
    const allPlanetsLink = await screen.findByRole('link', { name: 'All Planets' });
    await userEvent.click(allPlanetsLink);
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(await screen.findByText('🪐EdgePlanet with a long name 🪐')).toBeInTheDocument();
  });

  it('Shows planet residents again when clicking planet name in the breadcrumb', async () => {
    renderApp();
    await clickTatooine();
    const someResident = await screen.findByText('Luke Skywalker 11');
    await userEvent.click(someResident);
    const planetNameLink = await screen.findByRole('link', { name: TatooineMock.name });
    await userEvent.click(planetNameLink);
    await waitForLoading();
    const residents = await screen.findAllByText(/Luke Skywalker/);
    expect(residents.length).toBe(TatooineMock.residents.length);
  });

  it('When url is a resident, shows the name', async () => {
    renderApp(`/residents/${encodeURIComponent(TatooineMock.residents[0])}`);
    const luke = await screen.findByLabelText('Luke Skywalker 1');
    expect(luke).toBeInTheDocument();
  });
});

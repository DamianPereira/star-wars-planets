import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { TatooineMock } from '../mocks/TatooineMock';
import { clickTatooine, renderApp, waitForLoading } from './utils';

describe('Breadcrumb', () => {
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
});

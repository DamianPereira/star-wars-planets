import { clickTatooine, renderApp } from './utils';
import { screen } from '@testing-library/react';
import { TatooineMock } from '../mocks/TatooineMock';

describe('PlanetResidents', () => {
  it('Shows a planet resident when clicking view residents', async () => {
    renderApp();
    await clickTatooine();
    const resident = await screen.findByText('Luke Skywalker 1');
    expect(resident).toBeInTheDocument();
  });

  it('Loads one resident for each planet resident', async () => {
    renderApp();
    await clickTatooine();
    const residents = await screen.findAllByText(/Luke Skywalker/);
    expect(residents.length).toBe(TatooineMock.residents.length);
  });
});

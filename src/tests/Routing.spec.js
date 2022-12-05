import { TatooineMock } from '../mocks/TatooineMock';
import { screen } from '@testing-library/react';
import { renderApp, waitForLoading } from './utils';

describe('Routing', () => {
  it('When url is a resident, shows the name', async () => {
    renderApp(`/residents/${encodeURIComponent(TatooineMock.residents[0])}`);
    const luke = await screen.findByLabelText('Luke Skywalker 1');
    expect(luke).toBeInTheDocument();
  });
  it('When url is a planet, shows the residents', async () => {
    renderApp(`/planets/${encodeURIComponent(TatooineMock.url)}`);
    await waitForLoading();
    const residents = await screen.findAllByText(/Luke Skywalker/);
    expect(residents.length).toBe(TatooineMock.residents.length);
  });
});

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { RootStore } from '../model/RootStore';
import { userEvent } from '@storybook/testing-library';

export const renderApp = (initialUrl = '/') => {
  return render(
    <React.StrictMode>
      <MemoryRouter initialEntries={[initialUrl]}>
        <App store={RootStore.create({})} />
      </MemoryRouter>
    </React.StrictMode>
  );
};

export const waitForLoading = async () => {
  const loading = await screen.findAllByLabelText('Loading');
  await waitForElementToBeRemoved(loading, { timeout: 1000 });
};

export const clickTatooine = async () => {
  await waitForLoading();
  const viewResidents = await screen.findAllByRole('button', { name: 'View Residents' });
  await userEvent.click(viewResidents[0]);
  await waitForLoading();
};

import React from 'react';
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders search results', async () => {
  const { getAllByTestId, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const searchInput = getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 'overwatch' }});

  const searchBtn = getByTestId('search-btn');
  fireEvent.click(searchBtn);

  expect(getByTestId('loading-text').textContent).toBe("Loading...");
});

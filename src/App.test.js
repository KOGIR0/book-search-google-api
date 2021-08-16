import React from 'react';
import { render, fireEvent, waitFor, waitForElementToAppear } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

jest.setTimeout(20000);

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

  await waitFor(() => expect(getAllByTestId('book').length).toBe(30));
});

test('Load more results', async () => {
    const { container, getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'overwatch' }});
  
    let searchBtn = getByTestId('search-btn');
    fireEvent.click(searchBtn);

    for(let i = 0; container.querySelector('[class=load-more]'); i++)
    {
        let loadMoreBtn = await getByTestId('load-more-btn');
        fireEvent.click(loadMoreBtn);
        let resultsNum = +getByTestId('results-num').innerHTML;
        if(resultsNum > (i + 1) * 30)
        {
            await waitFor(() => expect(getAllByTestId('book').length).toBe(i * 30 + 30), {timeout: 3000});
        } else {
            await waitFor(() => expect(getAllByTestId('book').length).toBe(resultsNum), {timeout: 3000});
        }
    }
    let resultsNum = +getByTestId('results-num').innerHTML;
    await waitFor(() => expect(getAllByTestId('book').length).toBe(resultsNum), {timeout: 3000});
});

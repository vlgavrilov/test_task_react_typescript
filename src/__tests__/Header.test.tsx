import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import dataReducer from '../redux/reducers';
import rootSaga from '../sagas';
import Header from '../components/Header';

const sagaMiddleware = createSagaMiddleware();

describe('<Header />', () => {
  test('renders default correctly', async () => {
    const store = createStore(
      dataReducer,
    );

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const balanceElement = screen.getByText(/Balance/i);
    const payoutElement = screen.getByText(/Payout/i);

    expect(balanceElement).toBeInTheDocument();
    expect(payoutElement).toBeInTheDocument();
  });
  test('renders correctly', async (done) => {
    const store = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(rootSaga);

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    setTimeout(() => {
      const balanceElement = screen.getByText(/Balance/i);
      const payoutElement = screen.getByText(/Payout/i);
      const balanceCountElement = screen.getByText(/213920/i);
      const payoutCountElement = screen.getByText(/159465/i);

      expect(balanceElement).toBeInTheDocument();
      expect(payoutElement).toBeInTheDocument();
      expect(payoutCountElement).toBeInTheDocument();
      expect(balanceCountElement).toBeInTheDocument();
      done();
    }, 900);
  });
});

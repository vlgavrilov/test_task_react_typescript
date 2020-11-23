import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, put } from 'redux-saga/effects';

import dataReducer from '../redux/reducers';
import Header from '../components/Header';
import mockData from '../helpers/mockData';
import { SAVE_DATA } from '../redux/actionTypes';

function* mockDownloadData() {
  yield put({
    type: SAVE_DATA,
    payload: mockData,
  });
}
const sagaMiddleware = createSagaMiddleware();
function* mockRootSaga() {
  yield all([
    mockDownloadData(),
  ]);
}
describe('<Header />', () => {
  test('renders default correctly', async () => {
    const mockStore = createStore(
      dataReducer,
    );

    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );
    expect(screen).toMatchSnapshot();
  });

  test('renders correctly', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSaga);

    render(
      <Provider store={mockStore}>
        <Header />
      </Provider>,
    );

    const balanceElement = screen.getByTestId(/header-balance-title/i);
    const payoutElement = screen.getByTestId(/header-payout-title/i);
    const balanceCountElement = screen.getByTestId(/header-balance-text/i);
    const payoutCountElement = screen.getByTestId(/header-payout-text/i);

    expect(balanceElement.innerHTML).toEqual('Balance');
    expect(payoutElement.innerHTML).toEqual('Payout');
    expect(parseInt(payoutCountElement.innerHTML, 10)).toEqual(mockData.header.next_payout);
    expect(parseInt(balanceCountElement.innerHTML, 10)).toEqual(mockData.header.balance);
  });
});

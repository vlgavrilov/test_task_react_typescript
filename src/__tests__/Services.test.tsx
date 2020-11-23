import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { all, put } from 'redux-saga/effects';
import dataReducer from '../redux/reducers';
import { watchActivateBonus, watchFilterBonus } from '../sagas';
import Services from '../components/Services';
import { SAVE_DATA } from '../redux/actionTypes';
import mockData from '../helpers/mockData';

const sagaMiddleware = createSagaMiddleware();
function* mockDownloadData() {
  yield put({
    type: SAVE_DATA,
    payload: mockData,
  });
}

function* mockRootSagaFirstLoad() {
  yield all([
    mockDownloadData(),
  ]);
}

function* mockRootSagaAllHandler() {
  yield all([
    watchFilterBonus(),
    watchActivateBonus(),
    mockDownloadData(),
  ]);
}

describe('<Services />', () => {
  test('should display the component with an empty loading card', async () => {
    const mockStore = createStore(
      dataReducer,
    );

    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );

    expect(screen).toMatchSnapshot();
  });

  test('should display all cards', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSagaFirstLoad);
    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );

    const titleElements = screen.getAllByTestId('promocode-title');
    const descriptionElements = screen.getAllByTestId('promocode-description');
    const inputFilter = await screen.findByTestId('input-filter');
    const loader = await screen.queryByTestId('loader');
    const defaultTitleElement = screen.queryByText(/Title/i);
    const defaultDescriptionElement = screen.queryByText(/Description/i);

    expect(inputFilter).toBeInTheDocument();
    expect(loader).toBeNull();
    expect(titleElements.length).toEqual(mockData.bonuses.length);
    expect(titleElements[1].innerHTML).toEqual(mockData.bonuses[1].title);
    expect(descriptionElements.length).toEqual(mockData.bonuses.length);
    expect(descriptionElements[3].innerHTML).toEqual(mockData.bonuses[3].description);
    expect(defaultTitleElement).not.toBeInTheDocument();
    expect(defaultDescriptionElement).not.toBeInTheDocument();
  });
  test('should not display cards for a non-existent filter', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSagaAllHandler);
    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );
    const testValueNotExist = 'test-value-not-exist';
    const input = await screen.findByTestId('input-filter');
    fireEvent.change(input, { target: { value: testValueNotExist } });

    const titleElements = screen.queryAllByTestId('promocode-title');
    const descriptionElements = screen.queryAllByTestId('promocode-description');
    const inputFilter = await screen.findByTestId('input-filter');
    const loader = await screen.queryByTestId('loader');

    expect(inputFilter.getAttribute('value')).toEqual(testValueNotExist);
    expect(loader).toBeNull();
    expect(titleElements.length).toEqual(0);
    expect(descriptionElements.length).toEqual(0);
  });
  test('should only display cards that match the query', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSagaAllHandler);
    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );
    const filterValue = 'Sitecostructor';
    const inputFilter = await screen.findByTestId('input-filter');
    fireEvent.change(inputFilter, { target: { value: filterValue } });

    const titleElements = screen.queryAllByTestId('promocode-title');
    const descriptionElements = screen.getAllByTestId('promocode-description');

    const loader = await screen.queryByTestId('loader');

    const defaultTitleElement = screen.queryByText(/Title/i);
    const defaultDescriptionElement = screen.queryByText(/Description/i);

    expect(loader).toBeNull();
    expect(inputFilter.getAttribute('value')).toEqual(filterValue);
    expect(defaultTitleElement).not.toBeInTheDocument();
    expect(defaultDescriptionElement).not.toBeInTheDocument();
    expect(titleElements.length).toEqual(1);
    expect(descriptionElements.length).toEqual(1);
  });
  test('should display all cards', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSagaAllHandler);
    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );
    const inputFilter = await screen.findByTestId('input-filter');
    const buttonReset = await screen.findByTestId('button-reset-filter');
    fireEvent.change(inputFilter, { target: { value: 'test-value-not-exist' } });
    fireEvent.click(buttonReset);

    const titleElements = screen.queryAllByTestId('promocode-title');
    const descriptionElements = screen.getAllByTestId('promocode-description');

    const loader = await screen.queryByTestId('loader');

    const defaultTitleElement = screen.queryByText(/Title/i);
    const defaultDescriptionElement = screen.queryByText(/Description/i);

    expect(loader).toBeNull();
    expect(inputFilter.getAttribute('value')).toEqual('');
    expect(defaultTitleElement).not.toBeInTheDocument();
    expect(defaultDescriptionElement).not.toBeInTheDocument();
    expect(titleElements.length).toEqual(20);
    expect(descriptionElements.length).toEqual(20);
  });

  test('it should display the activated card', async () => {
    const mockStore = createStore(
      dataReducer,
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(mockRootSagaAllHandler);
    render(
      <Provider store={mockStore}>
        <Services />
      </Provider>,
    );
    const defaultButtonsActive = await screen.getAllByTestId('button-promocode-activate');
    const defaultButtonsUsed = await screen.queryAllByTestId('button-promocode-used');

    expect(defaultButtonsActive.length).toEqual(20);
    expect(defaultButtonsUsed.length).toEqual(0);

    fireEvent.click(defaultButtonsActive[0], new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));
    const newButtonsActive = await screen.getAllByTestId('button-promocode-activate');
    const buttonButtonsUsed = await screen.queryAllByTestId('button-promocode-used');

    expect(newButtonsActive.length).toEqual(19);
    expect(buttonButtonsUsed.length).toEqual(1);
  });
});

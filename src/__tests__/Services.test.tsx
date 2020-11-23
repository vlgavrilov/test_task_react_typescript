import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import '@testing-library/jest-dom';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import dataReducer from '../redux/reducers';
import rootSaga from '../sagas';
import Services from '../components/Services';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  dataReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

describe('<Services />', () => {
  test('should display the component with an empty loading card', async () => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    const titleElement = screen.getByText(/Title/i);
    const descriptionElement = screen.getByText(/Description/i);
    const promocodeElement = screen.getByText(/Services/i);
    const ButtonActivateElement = screen.getByText(/Reset/i);
    const loader = await screen.findByTestId('loader');
    const inputFilter = await screen.findByTestId('input-filter');

    expect(inputFilter).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(promocodeElement).toBeInTheDocument();
    expect(ButtonActivateElement).toBeInTheDocument();
  });

  test('should display all cards', async (done) => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    setTimeout(() => {
      const titleElement1 = screen.queryByText(/Sitecostructor/i);
      const titleElement2 = screen.queryByText(/Appvision.com/i);
      const defaultTitleElement = screen.queryByText(/Title/i);
      const descriptionElement1 = screen.queryByText(/Site constructor/i);
      const descriptionElement2 = screen.queryByText(/SDK/i);
      const defaultDescriptionElement = screen.queryByText(/Description/i);
      const promocodeElement = screen.getByText(/Services/i);
      const ButtonActivateElement = screen.getByText(/Reset/i);

      expect(defaultTitleElement).not.toBeInTheDocument();
      expect(defaultDescriptionElement).not.toBeInTheDocument();
      expect(titleElement1).toBeInTheDocument();
      expect(titleElement2).toBeInTheDocument();
      expect(descriptionElement1).toBeInTheDocument();
      expect(descriptionElement2).toBeInTheDocument();
      expect(promocodeElement).toBeInTheDocument();
      expect(ButtonActivateElement).toBeInTheDocument();
      done();
    }, 900);
  });
  test('should not display cards for a non-existent filter', async (done) => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    const input = await screen.findByTestId('input-filter');
    fireEvent.change(input, { target: { value: 'test-value-not-exist' } });

    setTimeout(() => {
      const titleElement1 = screen.queryByText(/Sitecostructor/i);
      const titleElement2 = screen.queryByText(/Appvision.com/i);
      const defaultTitleElement = screen.queryByText(/Title/i);
      const descriptionElement1 = screen.queryByText(/Site constructor/i);
      const descriptionElement2 = screen.queryByText(/SDK/i);
      const defaultDescriptionElement = screen.queryByText(/Description/i);

      expect(defaultTitleElement).not.toBeInTheDocument();
      expect(defaultDescriptionElement).not.toBeInTheDocument();
      expect(titleElement1).not.toBeInTheDocument();
      expect(titleElement2).not.toBeInTheDocument();
      expect(descriptionElement1).not.toBeInTheDocument();
      expect(descriptionElement2).not.toBeInTheDocument();
      done();
    }, 900);
  });
  test('should only display cards that match the query', async (done) => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    const input = await screen.findByTestId('input-filter');
    fireEvent.change(input, { target: { value: 'Sitecostructor' } });

    setTimeout(() => {
      const titleElement1 = screen.queryByText(/Sitecostructor/i);
      const titleElement2 = screen.queryByText(/Appvision.com/i);
      const defaultTitleElement = screen.queryByText(/Title/i);
      const descriptionElement1 = screen.queryByText(/Site constructor/i);
      const descriptionElement2 = screen.queryByText(/SDK/i);
      const defaultDescriptionElement = screen.queryByText(/Description/i);

      expect(defaultTitleElement).not.toBeInTheDocument();
      expect(defaultDescriptionElement).not.toBeInTheDocument();
      expect(titleElement1).toBeInTheDocument();
      expect(titleElement2).not.toBeInTheDocument();
      expect(descriptionElement1).toBeInTheDocument();
      expect(descriptionElement2).not.toBeInTheDocument();
      done();
    }, 900);
  });
  test('should display all cards', async (done) => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    const input = await screen.findByTestId('input-filter');
    const buttonResset = await screen.findByTestId('button-reset-filter');
    fireEvent.change(input, { target: { value: 'test-value-not-exist' } });
    fireEvent.click(buttonResset);

    setTimeout(() => {
      const titleElement = screen.getByText(/Sitecostructor/i);
      const defaultTitleElement = screen.queryByText(/Title/i);
      const descriptionElement = screen.getByText(/Site constructor/i);
      const defaultDescriptionElement = screen.queryByText(/Description/i);
      const promocodeElement = screen.getByText(/Services/i);
      const ButtonActivateElement = screen.getByText(/Reset/i);

      expect(defaultTitleElement).not.toBeInTheDocument();
      expect(defaultDescriptionElement).not.toBeInTheDocument();
      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
      expect(promocodeElement).toBeInTheDocument();
      expect(ButtonActivateElement).toBeInTheDocument();
      done();
    }, 900);
  });

  test('it should display the activated card', async (done) => {
    render(
      <Provider store={store}>
        <Services />
      </Provider>,
    );
    const button = await screen.getAllByTestId('button-promocode-activate');
    const buttonActivated = await screen.queryByText(/Activated!/i);

    expect(button[0]).toBeInTheDocument();
    expect(buttonActivated).not.toBeInTheDocument();

    fireEvent.click(button[0], new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));

    setTimeout(async () => {
      const buttonActivated2 = await screen.queryByText(/Activated!/i);

      expect(buttonActivated2).toBeInTheDocument();
      done();
    }, 900);
  });
});

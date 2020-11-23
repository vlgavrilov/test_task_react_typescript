import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PromocodeCard from '../components/PromocodeCard';
import dataReducer from '../redux/reducers';

const store = createStore(
  dataReducer,
);

describe('<PromocodeCard />', () => {
  test('should display a blank card with default text', async () => {
    const card = {
      id: 0,
      title: '',
      description: '',
      link: '',
      promocode: '',
      isUsed: false,
    };

    render(
      <Provider store={store}>
        <PromocodeCard
          id={card.id}
          isUsed={card.isUsed}
          title={card.title}
          description={card.description}
          promocode={card.promocode}
          link={card.promocode}
        />
      </Provider>,
    );
    const titleElement = screen.getByText(/Title/i);
    const descriptionElement = screen.getByText(/Description/i);
    const promocodeElement = screen.getByText(/Promocode/i);
    const ButtonActivateElement = screen.getByText(/Activate bonus/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(promocodeElement).toBeInTheDocument();
    expect(ButtonActivateElement).toBeInTheDocument();
  });

  test('should display a card with test redux', async () => {
    const card = {
      id: 133,
      title: 'Certificates',
      description: 'SSL',
      link: 'https://www.certificates.com/ssl-certificate/',
      promocode: 'itpaycodes',
      isUsed: false,
    };
    render(
      <Provider store={store}>
        <PromocodeCard
          id={card.id}
          isUsed={card.isUsed}
          title={card.title}
          description={card.description}
          promocode={card.promocode}
          link={card.promocode}
        />
      </Provider>,
    );

    const input = screen.getByDisplayValue('itpaycodes');
    const titleElement = screen.getByText(/Certificates/i);
    const descriptionElement = screen.getByText(/SSL/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});

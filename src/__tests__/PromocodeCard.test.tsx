import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PromocodeCard from '../components/PromocodeCard';

const mockStore = createStore(
  () => {},
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
      <Provider store={mockStore}>
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

    expect(screen).toMatchSnapshot();
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
      <Provider store={mockStore}>
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

    const input = screen.getByTestId('promocode-input');
    const titleElement = screen.getByTestId('promocode-title');
    const descriptionElement = screen.getByTestId('promocode-description');

    expect(titleElement.innerHTML).toEqual(card.title);
    expect(descriptionElement.innerHTML).toEqual(card.description);
    expect(input.getAttribute('value')).toEqual(card.promocode);
  });
});

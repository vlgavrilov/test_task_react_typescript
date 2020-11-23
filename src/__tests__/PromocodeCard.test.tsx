import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import PromocodeCard from '../components/PromocodeCard';
import '@testing-library/jest-dom';

describe('<PromocodeCard />', () => {
  test('should display a blank login form, with remember me checked by default', async () => {
    const card = {
      id: 133,
      title: 'Certificates',
      description: 'SSL',
      link: 'https://www.certificates.com/ssl-certificate/',
      promocode: 'itpaycodes',
      isUsed: false,
    };
    render(<PromocodeCard
      id={card.id}
      isUsed={card.isUsed}
      title={card.title}
      description={card.description}
      promocode={card.promocode}
      link={card.promocode}
    />);
    const titleElement = screen.getByText(/Certificates/i);
    const descriptionElement = screen.getByText(/SSL/i);
    const linkElement = screen.getByText(/ssl-certificate/i);
    const promocodeElement = screen.getByText(/itpaycodes/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(promocodeElement).toBeInTheDocument();
  });
});

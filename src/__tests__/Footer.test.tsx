import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';

describe('<Footer />', () => {
  test('should display a blank login form, with remember me checked by default', async () => {
    render(<Footer />);
    expect(screen).toMatchSnapshot();
  });

  test('should display a blank login form, with remember me checked by default', async () => {
    render(<Footer />);
    const footerText = screen.getByText(/© IT Promocodes, 2019/i);
    expect(footerText).toBeInTheDocument();
  });
});

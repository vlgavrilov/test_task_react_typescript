import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';

describe('<Footer />', () => {
  test('renders correctly', async () => {
    render(<Footer />);
    expect(screen).toMatchSnapshot();
  });
});

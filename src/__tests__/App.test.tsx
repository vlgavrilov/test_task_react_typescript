import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('<App />', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Balance/i);
    expect(linkElement).toBeInTheDocument();
  });
});

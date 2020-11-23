import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigateMenu from '../components/NavigateMenu';
import '@testing-library/jest-dom';

describe('<NavigateMenu />', () => {
  test('renders correctly', async () => {
    render(<NavigateMenu />);
    expect(screen).toMatchSnapshot();
  });
});

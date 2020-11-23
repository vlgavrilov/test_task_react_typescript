import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import NavigateMenu from '../components/NavigateMenu';
import '@testing-library/jest-dom';

describe('<NavigateMenu />', () => {
  test('should display a blank login form, with remember me checked by default', async () => {
    render(<NavigateMenu />);
    expect(screen).toMatchSnapshot();
  });
});

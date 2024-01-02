import { render } from '@testing-library/react';

import App from './app';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

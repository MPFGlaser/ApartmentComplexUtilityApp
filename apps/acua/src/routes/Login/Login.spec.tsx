import { render } from '@testing-library/react';

import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

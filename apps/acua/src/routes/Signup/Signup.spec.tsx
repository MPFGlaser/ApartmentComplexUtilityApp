import { render } from '@testing-library/react';

import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';

describe('Signup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Signup />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

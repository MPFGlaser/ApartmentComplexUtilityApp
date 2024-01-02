import { render } from '@testing-library/react';

import Navigation from './Navigation';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navigation />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

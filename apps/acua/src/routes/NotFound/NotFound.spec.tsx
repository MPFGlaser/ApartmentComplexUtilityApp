import { render } from '@testing-library/react';

import Notfound from './NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('Notfound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Notfound />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

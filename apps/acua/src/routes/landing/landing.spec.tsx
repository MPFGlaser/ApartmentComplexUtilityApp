import { render } from '@testing-library/react';

import Landing from './Landing';
import { MemoryRouter } from 'react-router-dom';

describe('Landing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Landing />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

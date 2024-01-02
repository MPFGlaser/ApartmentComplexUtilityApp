import { render } from '@testing-library/react';

import Editor from './Editor';
import { MemoryRouter } from 'react-router-dom';

describe('Editor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Editor />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Breadcrumbs from './RouterBreadcrumbs';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Breadcrumbs />, { wrapper: MemoryRouter });
    expect(baseElement).toBeTruthy();
  });
});

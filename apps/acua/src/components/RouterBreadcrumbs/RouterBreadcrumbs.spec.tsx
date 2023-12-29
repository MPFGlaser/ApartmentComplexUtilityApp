import { render } from '@testing-library/react';

import Breadcrumbs from './RouterBreadcrumbs';

describe('Breadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Breadcrumbs />);
    expect(baseElement).toBeTruthy();
  });
});

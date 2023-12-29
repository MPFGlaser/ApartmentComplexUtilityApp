import { render } from '@testing-library/react';
import RouterBreadcrumbs from '../RouterBreadcrumbs/RouterBreadcrumbs';

describe('RouterBreadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RouterBreadcrumbs />);
    expect(baseElement).toBeTruthy();
  });
});

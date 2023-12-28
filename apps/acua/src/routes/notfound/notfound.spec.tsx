import { render } from '@testing-library/react';

import Notfound from './notfound';

describe('Notfound', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Notfound />);
    expect(baseElement).toBeTruthy();
  });
});

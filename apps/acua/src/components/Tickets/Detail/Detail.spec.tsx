import { render } from '@testing-library/react';

import Detail from './Detail';

describe('Detail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Detail />);
    expect(baseElement).toBeTruthy();
  });
});

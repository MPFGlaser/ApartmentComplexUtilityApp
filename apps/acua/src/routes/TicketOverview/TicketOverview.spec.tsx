import { render } from '@testing-library/react';

import TicketOverview from './TicketOverview';

describe('TicketOverview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketOverview />);
    expect(baseElement).toBeTruthy();
  });
});

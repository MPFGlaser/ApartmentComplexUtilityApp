import { render } from '@testing-library/react';

import TicketOverview from './TicketOverview';
import { MemoryRouter } from 'react-router-dom';

describe('TicketOverview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketOverview />, {
      wrapper: MemoryRouter,
    });
    expect(baseElement).toBeTruthy();
  });
});

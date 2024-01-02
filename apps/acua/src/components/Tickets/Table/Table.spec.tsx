import { render } from '@testing-library/react';

import Table from './Table';
import { MemoryRouter } from 'react-router-dom';
import { Ticket } from '../../../types/Ticket';

const tickets: Ticket[] = [
  {
    id: 1,
    title: 'Broken sink',
    date: '2021-10-10',
    status: 'Open',
    author: 'John Doe',
    updateDate: '2021-10-10',
  },
];

describe('Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Table tickets={tickets} />, {
      wrapper: MemoryRouter,
    });
    expect(baseElement).toBeTruthy();
  });
});

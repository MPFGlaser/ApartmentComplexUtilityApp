import {
  DataGrid,
  GridSortModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { ITicket } from '../../../interfaces/ticket.interface';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface TableProps {}

const columns = [
  {
    field: 'createdAt',
    headerName: 'Created on',
    width: 100,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams) => {
      const date = new Date(params.value as string);
      return `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`;
    },
  },
  { field: 'title', headerName: 'Title', flex: 1, editable: false },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams) => {
      switch (params.value) {
        case 'open':
          return 'Open';
        case 'pending':
          return 'Pending';
        case 'inprogress':
          return 'In Progress';
        case 'completed':
          return 'Completed';
        case 'wontfix':
          return "Won't Fix";
        default:
          return 'Unknown';
      }
    },
  },
];

function Table({ tickets }: ReadOnly<{ tickets: ITicket[] }>) {
  const navigate = useNavigate();

  const handleRowClick = (param: { id: number | string }) => {
    navigate(`/tickets/view/${param.id}`);
  };

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tickets}
        columns={columns}
        onRowClick={handleRowClick}
        localeText={{ noRowsLabel: 'No tickets found.' }}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  );
}

export default Table;

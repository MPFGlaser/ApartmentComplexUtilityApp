import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TableProps {}

const columns = [
  { field: 'date', headerName: 'Created on', width: 100, editable: false },
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'status', headerName: 'Status', width: 100 },
];

function Table({ tickets }) {
  const navigate = useNavigate();

  const handleRowClick = (param) => {
    navigate(`/tickets/view/${param.id}`);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={tickets} columns={columns} onRowClick={handleRowClick} />
    </div>
  );
}

export default Table;
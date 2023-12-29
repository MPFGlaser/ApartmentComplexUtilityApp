import TicketOverview from './TicketOverview/TicketOverview';
import Landing from './Landing/Landing';
import Notfound from './NotFound/NotFound';
import HomeIcon from '@mui/icons-material/Home';
import HandymanIcon from '@mui/icons-material/Handyman';
import Detail from '../components/Tickets/Detail/Detail';
import Editor from '../components/Tickets/Editor/Editor';

export const navRoutes = [
  { path: '/', element: <Landing />, name: 'Landing', icon: <HomeIcon /> },
  {
    path: '/tickets',
    element: <TicketOverview />,
    name: 'Repair Requests',
    icon: <HandymanIcon />,
  },
];

const utilityRoutes = [
  {
    path: '/tickets/view/:id',
    element: <Detail />,
  },
  { path: '/tickets/edit/:id', element: <Editor /> },
  { path: '/tickets/create', element: <Editor /> },
  { path: '*', element: <Notfound /> },
];

export const routes = [...navRoutes, ...utilityRoutes];

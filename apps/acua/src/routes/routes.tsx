import TicketOverview from './TicketOverview/TicketOverview';
import Landing from './Landing/Landing';
import Notfound from './NotFound/NotFound';
import HomeIcon from '@mui/icons-material/Home';
import HandymanIcon from '@mui/icons-material/Handyman';
import Detail from '../components/Tickets/Detail/Detail';
import { Editor as TicketEditor } from '../components/Tickets/Editor/Editor';
import { Navigate } from 'react-router-dom';
import { Editor as ProfileEditor } from '../components/Profile/Editor/Editor';

export const navRoutes = [
  { path: '/', element: <Landing />, name: 'Home', icon: <HomeIcon /> },
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
  { path: '/tickets/edit/:id', element: <TicketEditor /> },
  { path: '/tickets/create', element: <TicketEditor /> },
  { path: '/edit-profile', element: <ProfileEditor /> },
  { path: '/not-found', element: <Notfound /> },
  { path: '*', element: <Navigate to="/not-found" replace /> },
];

export const routes = [...navRoutes, ...utilityRoutes];

export const breadcrumbNameMap = [
  {
    path: '/tickets',
    breadcrumbName: 'Repair Requests',
    hasDynamicPart: false,
  },
  {
    path: '/tickets/view',
    breadcrumbName: 'Details',
    hasDynamicPart: true,
  },
  {
    path: '/tickets/edit',
    breadcrumbName: 'Edit Repair Request',
    hasDynamicPart: true,
  },
  {
    path: '/tickets/create',
    breadcrumbName: 'New',
    hasDynamicPart: false,
  },
  {
    path: '/edit-profile',
    breadcrumbName: 'Profile',
    hasDynamicPart: false,
  },
];

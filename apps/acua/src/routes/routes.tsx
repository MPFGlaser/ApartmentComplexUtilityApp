import TicketOverview from './TicketOverview/TicketOverview';
import Landing from './Landing/Landing';
import Notfound from './NotFound/NotFound';
import HomeIcon from '@mui/icons-material/Home';
import HandymanIcon from '@mui/icons-material/Handyman';
import Detail from '../components/Tickets/Detail/Detail';
import { Editor as TicketEditor } from '../components/Tickets/Editor/Editor';
import { Navigate } from 'react-router-dom';
import { Editor as ProfileEditor } from '../components/Profile/Editor/Editor';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { ProtectedRoute } from '../util/ProtectedRoute';

export const navRoutes = [
  {
    path: '/',
    element: <Landing />,
    name: 'Home',
    icon: <HomeIcon />,
    testid: 'navigation-home-button',
  },
  {
    path: '/tickets',
    element: (
      <ProtectedRoute>
        <TicketOverview />
      </ProtectedRoute>
    ),
    name: 'Repair Requests',
    icon: <HandymanIcon />,
    testid: 'navigation-tickets-button',
  },
];

const utilityRoutes = [
  {
    path: '/tickets/view/:id',
    element: (
      <ProtectedRoute>
        <Detail />,
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/edit/:id',
    element: (
      <ProtectedRoute>
        <TicketEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/create',
    element: (
      <ProtectedRoute>
        <TicketEditor />
      </ProtectedRoute>
    ),
  },
  {
    path: '/edit-profile',
    element: (
      <ProtectedRoute>
        <ProfileEditor />
      </ProtectedRoute>
    ),
  },
  { path: '/not-found', element: <Notfound /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
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
  {
    path: '/login',
    breadcrumbName: 'Login',
    hasDynamicPart: false,
  },
  {
    path: '/signup',
    breadcrumbName: 'Sign up',
    hasDynamicPart: false,
  },
];

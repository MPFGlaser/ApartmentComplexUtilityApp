import Landing from './landing/landing';
import Notfound from './notfound/notfound';
import HomeIcon from '@mui/icons-material/Home';

export const navRoutes = [
  { path: '/', element: <Landing />, name: 'Landing', icon: <HomeIcon /> },
];

const utilityRoutes = [{ path: '*', element: <Notfound /> }];

export const routes = [...navRoutes, ...utilityRoutes];

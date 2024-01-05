import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import RouterBreadcrumbs from '../components/RouterBreadcrumbs/RouterBreadcrumbs';
import axios from 'axios';
import { useAuth } from '../util/AuthProvider';

export function App() {
  const { getIdToken } = useAuth();

  // Add Firebase IdToken to all axios requests
  axios.interceptors.request.use(
    async (config) => {
      config.headers.token = await getIdToken();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <Navigation>
        <RouterBreadcrumbs />
        <Outlet />
      </Navigation>
    </div>
  );
}

export default App;

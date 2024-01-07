import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import RouterBreadcrumbs from '../components/RouterBreadcrumbs/RouterBreadcrumbs';
import axios from 'axios';
import { auth } from '../util/firebase';

export function App() {
  // Add Firebase IdToken to all axios requests
  axios.interceptors.request.use(
    async (config) => {
      const { currentUser } = auth;
      if (currentUser) {
        config.headers.token = await currentUser.getIdToken();
        config.headers.withCredentials = false;
      }
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

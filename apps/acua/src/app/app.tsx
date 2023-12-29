// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import RouterBreadcrumbs from '../components/RouterBreadcrumbs/RouterBreadcrumbs';

export function App() {
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

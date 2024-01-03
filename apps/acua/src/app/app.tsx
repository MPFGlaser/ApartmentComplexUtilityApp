import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import RouterBreadcrumbs from '../components/RouterBreadcrumbs/RouterBreadcrumbs';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../util/firebase';
import { UserContext } from '../util/UserContext';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUserLoading(false);
    });

    return () => unsubscribe();
  });

  return (
    <div>
      <UserContext.Provider value={{ user, userLoading, setUser }}>
        <Navigation>
          <RouterBreadcrumbs />
          <Outlet />
        </Navigation>
      </UserContext.Provider>
    </div>
  );
}

export default App;

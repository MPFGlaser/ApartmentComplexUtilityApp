import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import Landing from './routes/landing/landing';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Notfound from './routes/notfound/notfound';

const routes = [
  { path: '/', element: <Landing /> },
  { path: '*', element: <Notfound /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

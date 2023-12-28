import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/routes';

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

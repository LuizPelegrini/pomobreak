import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { History } from '../pages/History';
import { DefaultLayout } from '../layouts/DefaultLayout';

const router = createBrowserRouter([
  {
    path: 'pomobreak',
    element: <DefaultLayout />,
    children: [
      {
        path: '/pomobreak/',
        element: <Home />,
      },
      {
        path: '/pomobreak/history/',
        element: <History />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

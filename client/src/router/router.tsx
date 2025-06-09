import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import App from '../App.tsx';
import { guestRoutes } from './constants/guestRoutes.tsx';
import { errorRoutes } from './constants/errorRoutes.ts';
import AppContent from '../containers/app-content/AppContent.tsx';
import Home from '../pages/home/Home.tsx';

const routerConfig = (
  <Route
    element={<App />}
    errorElement={<Navigate to={errorRoutes.notFound.route} />}
    path={guestRoutes.home.route}
  >
    <Route element={<AppContent/>}>
      <Route element={<Home/>} index/>
    </Route>
  </Route>
);

export const router = createBrowserRouter(
  createRoutesFromElements(routerConfig)
)
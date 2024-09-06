import { HOME_ROUTE, LOGIN_ROUTE } from 'shared/constants/const';
import { lazy } from 'react';
import { IconChartArcs } from '@tabler/icons-react';

const home = lazy(() => import('pages/home'));

const login = lazy(() => import('pages/login'));

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: login,
    title: 'login',
  },
];

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: home,
    pageTitle: 'Презентации',
    icon: IconChartArcs,
  },
];

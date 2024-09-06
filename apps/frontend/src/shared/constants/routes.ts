import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRESENTATION_ROUTE,
} from 'shared/constants/const';
import { lazy } from 'react';
import { IconChartArcs } from '@tabler/icons-react';

const home = lazy(() => import('pages/home'));
const presentation = lazy(() => import('pages/presentation'));

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
  {
    path: PRESENTATION_ROUTE,
    Component: presentation,
    pageTitle: 'Презентации',
    icon: IconChartArcs,
  },
];

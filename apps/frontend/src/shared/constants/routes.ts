import {
  CREATING_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRESENTATION_ROUTE,
  STORAGE_ROUTE,
} from 'shared/constants/const';
import { lazy } from 'react';
import { IconHome } from '@tabler/icons-react';

const home = lazy(() => import('pages/home'));
const presentation = lazy(() => import('pages/presentation'));
const creating = lazy(() => import('pages/creating'));

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: home,
    title: 'login',
  },
];

export const authRoutes = [
  {
    path: HOME_ROUTE,
    Component: home,
    pageTitle: 'Презентации',
    icon: IconHome,
    isNav: true,
  },
  {
    path: PRESENTATION_ROUTE,
    Component: presentation,
    pageTitle: 'Презентации',
    icon: null,
    isNav: false,
  },
  {
    path: CREATING_ROUTE,
    Component: creating,
    pageTitle: 'Презентации',
    icon: null,
    isNav: false,
  },
  {
    path: STORAGE_ROUTE,
    Component: home,
    pageTitle: 'Файлы',
    icon: null,
    isNav: false,
  },
];

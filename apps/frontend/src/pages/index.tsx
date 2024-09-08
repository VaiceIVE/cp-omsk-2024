import { Flex, Loader, Stack } from '@mantine/core';
import { Context } from 'main';
import { observer } from 'mobx-react-lite';
import { lazy, useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from 'shared/constants/const';
import { authRoutes } from 'shared/constants/routes';
import { Header } from 'widgets/header';

const HomePage = lazy(() => import('pages/home'));

const Routing = observer(() => {
  const { UStore } = useContext(Context);
  const [isLoading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      UStore.isAuth &&
      !authRoutes.find((item) => location.pathname.includes(item.path))
    ) {
      navigate(HOME_ROUTE);
    }
  }, [UStore.isAuth, location.pathname, navigate]);

  useEffect(() => {
    setLoading(true);
    UStore.checkAuth().finally(() => {
      setLoading(false);
    });
  }, [UStore]);

  if (isLoading) {
    return (
      <Stack h={'100vh'} bg={'white'} align="center" justify="center">
        <Loader size="xl" color="myBlue.2" />
      </Stack>
    );
  }

  return (
    <Flex className="wrapper" style={{ height: '100vh' }}>
      {!location.pathname.includes('/presentation') && <Header />}
      <Flex flex={1} gap={0}>
        <Stack flex={1} w={'100%'}>
          <Routes>
            {authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Stack>
      </Flex>
    </Flex>
  );
});

export default Routing;

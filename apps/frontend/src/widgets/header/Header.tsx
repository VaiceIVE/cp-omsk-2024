import { Flex } from '@mantine/core';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import logo from 'shared/assets/logo.svg';
import logoMini from 'shared/assets/logo-mini.svg';
import { NavigationList } from './components/NavigationList';
import { Button } from 'shared/ui/Button';
import { BreadCrumbs } from './components/BreadCrumbs';

export const Header = () => {
  const location = useLocation();

  const isPresentationPage = location.pathname.includes('presentation');

  return (
    <header className={styles.header}>
      <Flex w={'100%'} align="center" justify="space-between">
        <Flex align={'center'} gap={isPresentationPage ? 24 : 44}>
          <Link to={'/'}>
            <img src={isPresentationPage ? logoMini : logo} alt="logo" />
          </Link>
          {isPresentationPage ? <BreadCrumbs /> : <NavigationList />}
        </Flex>

        {isPresentationPage && (
          <Flex gap={12}>
            <Button label="Экспортировать" variant="outline" />
            <Button label="Сохранить изменения" />
          </Flex>
        )}
      </Flex>
    </header>
  );
};

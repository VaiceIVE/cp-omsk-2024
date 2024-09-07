import { Flex } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { authRoutes } from 'shared/constants/routes';

import styles from '../../Header.module.scss';

export const NavigationList = () => {
  return (
    <nav id="nav">
      <Flex gap={16}>
        {authRoutes
          .filter((l) => l.isNav)
          .map((l) => (
            <NavLink key={l.path} to={l.path}>
              {l.icon ? (
                <Flex className={styles.link} gap={8}>
                  <l.icon stroke={2} />
                  {l.pageTitle}
                </Flex>
              ) : (
                <div className={styles.link}>{l.pageTitle}</div>
              )}
            </NavLink>
          ))}
      </Flex>
    </nav>
  );
};

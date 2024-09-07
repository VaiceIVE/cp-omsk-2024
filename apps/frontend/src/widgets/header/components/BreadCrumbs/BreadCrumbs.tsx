import { Flex } from '@mantine/core';
import { IconChevronRight, IconHome } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

export const BreadCrumbs = () => {
  return (
    <Flex align={'center'} gap={12}>
      <NavLink to={'/'}>
        <Flex gap={12}>
          <IconHome stroke={2} color="#606060" size={20} />
          <p className="text medium">Презентации</p>
        </Flex>
      </NavLink>
      <IconChevronRight stroke={2} color="#606060" size={20} />
      <p className="text medium secondary">Новая презентация</p>
    </Flex>
  );
};

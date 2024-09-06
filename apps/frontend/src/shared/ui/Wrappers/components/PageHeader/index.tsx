import { Flex } from '@mantine/core';
import { Title } from 'shared/ui/Title';

import { useLocation } from 'react-router-dom';
import { authRoutes } from 'shared/constants/routes';

interface PageHeaderProps {
  button: React.ReactNode;
  title?: string;
}

export const PageHeader = ({ button, title }: PageHeaderProps) => {
  const location = useLocation();
  const defaultTitle = authRoutes.find(
    (item) => item.path === location.pathname
  )?.pageTitle;

  return (
    <Flex align={'center'} justify={'space-between'}>
      <Title level={2} title={title ? title : defaultTitle} />
      {button}
    </Flex>
  );
};

import { useState } from 'react';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { CREATING_ROUTE } from 'shared/constants/const';
import { Button } from 'shared/ui/Button';
import { PageWrapper } from 'shared/ui/Wrappers/PageWrapper';
import { HomeList } from 'widgets/home-list';
import { Stack } from '@mantine/core';
import { Title } from 'shared/ui/Title';

import bg from 'shared/assets/bg.png';
import empty from 'shared/assets/empty.png';

const HomePage = () => {
  const [x] = useState(false);

  return (
    <Stack pt={40} gap={48} flex={1}>
      <Stack
        style={{
          backgroundColor: '#EFF4FF',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        pos={'relative'}
        p={32}
        className="container"
        gap={24}
      >
        <Stack w={644}>
          <Title
            level={1}
            title="Я Пиксель - робот-художник.  Создадим вашу первую презентацию?"
          />
        </Stack>
        <Link to={CREATING_ROUTE}>
          <Button
            label="Новая презентация"
            icon={<IconSquareRoundedPlusFilled />}
            variant="accent"
          />
        </Link>

        <img
          style={{ position: 'absolute', right: 0, bottom: 0, width: '42%' }}
          alt="bg"
          src={bg}
        />
      </Stack>
      <PageWrapper
        pt={0}
        button={
          x ? (
            <Link to={CREATING_ROUTE}>
              <Button
                label="Новая презентация"
                icon={<IconSquareRoundedPlusFilled />}
              />
            </Link>
          ) : undefined
        }
        title="Лаборатории"
      >
        {x ? (
          <HomeList />
        ) : (
          <Stack mt={16} gap={40} align="center">
            <img alt="empty" src={empty} />
            <Stack gap={12} align="center">
              <Title level={3} title="Презентаций еще нет" />
              <Title
                level={4}
                medium
                title="Создайте первую презентацию, чтобы Пиксель не сидел без дела"
              />
            </Stack>
            <Link to={CREATING_ROUTE}>
              <Button
                label="Новая презентация"
                icon={<IconSquareRoundedPlusFilled />}
              />
            </Link>
          </Stack>
        )}
        <div></div>
      </PageWrapper>
    </Stack>
  );
};

export default HomePage;

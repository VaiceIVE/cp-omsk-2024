import { Flex, Stack } from '@mantine/core';
import styles from './HomeList.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';

import template1 from 'shared/assets/templates/template1.png';
import template2 from 'shared/assets/templates/template2.png';
import template3 from 'shared/assets/templates/template3.png';
import { IPres } from 'pages/home';
import { NavLink } from 'react-router-dom';

interface HomeListProps {
  presentations: IPres[];
}

const templates: Record<string, string> = {
  Template1: template1,
  Template2: template2,
  Template3: template3,
};

export const HomeList = ({ presentations }: HomeListProps) => {
  return (
    <ul>
      <Flex gap={16} wrap={'wrap'}>
        {presentations?.map((p) => (
          <NavLink to={`/response/${p.id}`}>
            <li key={p.id} className={styles.card}>
              <img
                src={templates[p.templateId]}
                alt="name"
                className={styles.image}
              />
              <Stack gap={6}>
                <p className={classNames('text semibold', styles.name)}>
                  Новая презентация
                </p>
                <Flex className={styles.description} align={'center'} gap={4}>
                  <div>{dayjs(new Date()).format('DD.MM')}</div>
                  <div className={styles.circle}></div>
                  <div>Файл</div>
                </Flex>
              </Stack>
            </li>
          </NavLink>
        ))}
      </Flex>
    </ul>
  );
};

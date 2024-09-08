import { Flex, Stack } from '@mantine/core';
import styles from './HomeList.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { IPresentation } from 'shared/models/IPresentstion';

interface HomeListProps {
  presentations: IPresentation[];
}

export const HomeList = ({ presentations }: HomeListProps) => {
  return (
    <ul>
      <Flex gap={16} wrap={'wrap'}>
        {presentations?.map((p) => (
          <li key={p.id} className={styles.card}>
            <img src={undefined} alt="name" className={styles.image} />
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
        ))}
      </Flex>
    </ul>
  );
};

import { Flex, Stack } from '@mantine/core';
import styles from './HomeList.module.scss';
import classNames from 'classnames';

export const HomeList = () => {
  return (
    <ul>
      <Flex gap={16} wrap={'wrap'}>
        <li className={styles.card}>
          <img src={undefined} alt="name" className={styles.image} />
          <Stack gap={6}>
            <p className={classNames('text semibold', styles.name)}>
              Название презентации очень длинное
            </p>
            <Flex className={styles.description} align={'center'} gap={4}>
              <div>123</div>
              <div className={styles.circle}></div>
              <div>123</div>
            </Flex>
          </Stack>
        </li>
        <li className={styles.card}>
          <img src={undefined} alt="name" className={styles.image} />
          <Stack gap={6}>
            <p className={classNames('text semibold', styles.name)}>
              Название презентации очень длинное
            </p>
            <Flex className={styles.description} align={'center'} gap={4}>
              <div>123</div>
              <div className={styles.circle}></div>
              <div>123</div>
            </Flex>
          </Stack>
        </li>
      </Flex>
    </ul>
  );
};

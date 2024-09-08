import { Flex } from '@mantine/core';

import styles from './Footer.module.scss';
import { SLIDES_LINK } from 'shared/constants/links';

export const Footer = () => {
  return (
    <Flex
      align={'center'}
      className={styles.footer}
      p={'20px 40px'}
      justify={'space-between'}
    >
      <Flex align={'center'} gap={12}>
        <p className="text medium">Команда “Адера”</p>
      </Flex>
      <Flex className={styles.links} align={'center'} gap={20}>
        <a
          className="text medium"
          target="_blank"
          href={SLIDES_LINK}
          rel="noreferrer"
        >
          Репозиторий
        </a>
      </Flex>
    </Flex>
  );
};

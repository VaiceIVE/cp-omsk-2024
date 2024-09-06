import { Flex } from '@mantine/core';

import styles from './Footer.module.scss';
import { DEMO_LINK, SLIDES_LINK } from 'shared/constants/links';

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
          href={DEMO_LINK}
          rel="noreferrer"
        >
          Демо
        </a>
        <a
          className="text medium"
          target="_blank"
          href={SLIDES_LINK}
          rel="noreferrer"
        >
          Презентация
        </a>
      </Flex>
    </Flex>
  );
};

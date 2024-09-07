import { Fragment, useState } from 'react';
import { FormSection } from '../FormSection';
import { Title } from 'shared/ui/Title';
import { Flex, Stack } from '@mantine/core';
import { Radio } from 'shared/ui/Radio';
import { IconCircle } from '../IconCircle';
import { IconInfoCircle } from '@tabler/icons-react';

import styles from './OptionsForm.module.scss';
import { Checkbox } from 'shared/ui/Checkbox';
import classNames from 'classnames';

const tags = [
  {
    text: 'Гистограмма',
    value: 'histogram',
  },
  {
    text: 'Круговая диаграмма',
    value: 'pie',
  },
  {
    text: 'Линейчатая',
    value: 'bar',
  },
  {
    text: 'Лепестковая',
    value: 'radar',
  },
];

export const OptionsForm = () => {
  const [hasCharts, setHasCharts] = useState(false);

  return (
    <Fragment>
      <FormSection>
        <Title level={4} semibold title="Настройки презентации" />

        <Stack gap={12}>
          <p className="text semibold">Длина презентации*</p>

          <Flex gap={12}>
            <Radio
              type="block"
              label={'Короткая'}
              text="3-7 слайдов"
              value={''}
            />
            <Radio
              type="block"
              label={'Средняя'}
              text="8-11 слайдов"
              value={''}
            />
            <Radio
              type="block"
              label={'Длинная'}
              text="12+ слайдов"
              value={''}
            />
          </Flex>
        </Stack>

        <Stack gap={12}>
          <p className="text semibold">Текстовки на слайдах*</p>

          <Flex gap={12}>
            <Radio
              type="block"
              label={'Изменить формулировки'}
              text="Сократим/удлиним текст"
              value={''}
            />
            <Radio
              type="block"
              label={'Не менять формулировки'}
              text="Текст останется неизменным"
              value={''}
            />
          </Flex>
        </Stack>
      </FormSection>

      <FormSection>
        <Title level={4} semibold title="Настройки графиков (опционально)" />
        <Flex className={styles.info} align={'center'} gap={16}>
          <IconCircle width={40} size={24} Icon={IconInfoCircle} />
          <p className="text medium">
            В случае, если вы не выберите формат отображения, наш алгоритм сам
            выберет один наиболее подходящий
          </p>
        </Flex>
        <Stack gap={20}>
          <p className="text semibold">Отображение данных</p>

          <Checkbox
            value={''}
            checked={hasCharts}
            onChange={setHasCharts}
            label={'Есть предпочитаемые форматы отображения'}
          />

          <Stack gap={12}>
            <ul style={!hasCharts ? { opacity: 0.4 } : undefined}>
              <Flex gap={8}>
                {tags.map((t) => (
                  <li className={classNames(styles.tag)} key={t.value}>
                    {t.text}
                  </li>
                ))}
              </Flex>
            </ul>

            <p className="text medium tertiary">
              * Каждый выбранный вид отображения добавит +1 слайд к презентации
            </p>
          </Stack>
        </Stack>
      </FormSection>
    </Fragment>
  );
};

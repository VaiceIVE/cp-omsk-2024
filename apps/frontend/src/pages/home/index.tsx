import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { Button } from 'shared/ui/Button';
import { PageWrapper } from 'shared/ui/Wrappers/PageWrapper';
import { HomeList } from 'widgets/home-list';

const HomePage = () => {
  return (
    <PageWrapper
      button={
        <Button
          label="Новая презентация"
          icon={<IconSquareRoundedPlusFilled />}
        />
      }
      title="Лаборатории"
    >
      <HomeList />
      <div></div>
    </PageWrapper>
  );
};

export default HomePage;

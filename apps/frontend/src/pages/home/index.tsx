import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { Button } from 'shared/ui/Button';
import { PageWrapper } from 'shared/ui/Wrappers/PageWrapper';

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
      <div>123</div>
      <div></div>
    </PageWrapper>
  );
};

export default HomePage;

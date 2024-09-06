import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/Button';
import { PageWrapper } from 'shared/ui/Wrappers/PageWrapper';
import { HomeList } from 'widgets/home-list';

const HomePage = () => {
  return (
    <PageWrapper
      button={
        <Link to={'presentation/23'}>
          <Button
            label="Новая презентация"
            icon={<IconSquareRoundedPlusFilled />}
          />
        </Link>
      }
      title="Лаборатории"
    >
      <HomeList />
      <div></div>
    </PageWrapper>
  );
};

export default HomePage;

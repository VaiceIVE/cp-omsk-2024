import styles from './PresentationPage.module.scss';
import { PresentationWorkspace } from 'widgets/presentation-workspace';

const PresentationPage = () => {
  return (
    <section className={styles.root}>
      <PresentationWorkspace />
    </section>
  );
};

export default PresentationPage;

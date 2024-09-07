import { useContext } from 'react';
import { notNull } from 'shared/utils/notNull';
import { CreatingPageContext } from './CreatingPageContext';

export function useCreatingPage() {
  const creatingPageData = useContext(CreatingPageContext);

  return notNull(creatingPageData);
}

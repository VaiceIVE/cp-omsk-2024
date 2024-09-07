import { useContext } from 'react';
import { notNull } from 'shared/utils/notNull';
import { PresentationPageContext } from './PresentationPageContext';

export function usePresentationPage() {
  const presentationPageData = useContext(PresentationPageContext);

  return notNull(presentationPageData);
}

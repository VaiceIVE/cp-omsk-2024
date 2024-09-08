import { LoadingOverlay as MantineLoadingOverlay } from '@mantine/core';
import { LoadingModal } from './LoadingModal';

interface LoadingOverlayProps {
  visible: boolean;
  title?: string;
}

export const LoadingOverlay = ({ visible, title }: LoadingOverlayProps) => {
  return (
    <MantineLoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{
        radius: 'sm',
        blur: 4,
        color: 'GrayText',
        backgroundOpacity: 0.3,
      }}
      loaderProps={{ children: <LoadingModal title={title} />, w: '100%' }}
    />
  );
};

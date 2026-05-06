import { useEffect } from 'react';
import { useInterfaceStore } from '../store/interfaceStore';

/**
 * Hook to automatically toggle immersive mode based on a game-specific condition.
 * @param isImmersiveActive Boolean condition (e.g., status === 'PLAYING')
 */
export function useImmersiveMode(isImmersiveActive: boolean) {
  const setImmersive = useInterfaceStore((state) => state.setImmersive);

  useEffect(() => {
    if (isImmersiveActive) {
      setImmersive(true);
    } else {
      setImmersive(false);
    }

    // Ensure we clean up immersive mode when the component unmounts
    return () => setImmersive(false);
  }, [isImmersiveActive, setImmersive]);
}

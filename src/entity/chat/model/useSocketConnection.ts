import { useEffect, useCallback } from 'react';
import type { IChatSocketService } from '../lib/socketService';

interface UseSocketConnectionProps {
  socketService: IChatSocketService;
  autoConnect?: boolean;
}

export const useSocketConnection = ({
  socketService,
  autoConnect = true,
}: UseSocketConnectionProps) => {
  useEffect(() => {
    if (autoConnect && !socketService.isConnected) {
      socketService.connect().catch(console.error);
    }
  }, [autoConnect, socketService]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && autoConnect && !socketService.isConnected) {
        socketService.connect().catch(console.error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [autoConnect, socketService]);

  const connect = useCallback(() => socketService.connect(), [socketService]);
  const disconnect = useCallback(() => socketService.disconnect(), [socketService]);

  return {
    isConnected: socketService.isConnected,
    connectionState: socketService.connectionState,
    connect,
    disconnect,
  };
};

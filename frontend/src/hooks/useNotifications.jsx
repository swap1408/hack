// src/hooks/useNotifications.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('/:4000'); // Replace with your backend

export const useNotifications = (onNotify) => {
  useEffect(() => {
    socket.on('notification', onNotify);
    return () => socket.disconnect();
  }, [onNotify]);
};

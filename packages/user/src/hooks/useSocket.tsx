import { io, Socket } from 'socket.io-client';
import useReservationStore from '../stores/reservationStore';

const BASE_URL = 'http://devserver.jigeumgo.com';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
}

const useSocket = (token: string): SocketHooks => {
  const { removeReservation } = useReservationStore();

  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    socket[token].on('server.cancel-reservation.user', () => {
      removeReservation();
    });

    socket[token].on('server.check-in.user', () => {
      removeReservation();
    });
  }

  return { socket: socket[token] };
};

export default useSocket;

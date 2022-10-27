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
      console.log('가게로부터 해당 예약건이 취소되었습니다.');
    });

    socket[token].on('server.check-in.user', () => {
      removeReservation();
      console.log('가게로부터 해당 예약건이 CheckIn되었습니다.');
    });
  }

  return { socket: socket[token] };
};

export default useSocket;

import { io, Socket } from 'socket.io-client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useReservationStore from '../stores/reservationStore';
import useTimeDealStore from '../stores/timeDealStore';
import { getReservationInfo } from '../apis/reservationAPI';
import { getParcitipantInfoByStore } from '../apis/timeDealAPI';
import PopupStand from '../components/PopupStand';
import PopupFail from '../components/popupFail';

const BASE_URL = 'http://devserver.jigeumgo.com';
const socket: { [key: string]: Socket } = {};

interface SocketHooks {
  socket: Socket;
}

const useSocket = (token: string): SocketHooks => {
  const MySwal = withReactContent(Swal);
  const { addStand, removeReservation, updateReservation } = useReservationStore();
  const { addParticipant } = useTimeDealStore();

  if (!socket[token]) {
    socket[token] = io(BASE_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    socket[token].on('server.find-store.store', async (reservationId: number) => {
      const response = await getReservationInfo(reservationId);
      if (!('error' in response)) {
        addStand(response);
        MySwal.fire({
          html: <PopupStand item={response} close={Swal.close} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'popup-border-radius',
          },
        });
      } else {
        MySwal.fire({
          html: <PopupFail title="오류!" description={response.message} close={Swal.clickCancel} />,
          showConfirmButton: false,
          width: '480px',
          padding: 0,
          customClass: {
            popup: 'popup-border-radius',
          },
          timer: 2000,
        });
      }
    });

    socket[token].on('server.cancel-reservation.store', (reservationId: number) => {
      removeReservation(reservationId);
      console.log('사용자로부터 해당 예약건이 취소되었습니다.');
    });

    socket[token].on(
      'server.delay-reservation.store',
      (response: { reservationId: number; estimatedTime: Date }) => {
        updateReservation(response.reservationId, response.estimatedTime);
        console.log('사용자로부터 해당 예약건이 지연되었습니다.');
      },
    );

    socket[token].on('server.check-in-time-deal.store', async (participantId: number) => {
      const response = await getParcitipantInfoByStore(participantId);
      if (!('error' in response)) {
        addParticipant(response.timeDeal.id, response.id, response.user);
      } else {
        console.log(response.message);
      }
    });
  }

  return { socket: socket[token] };
};

export default useSocket;

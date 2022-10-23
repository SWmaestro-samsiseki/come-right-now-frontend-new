import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../hooks/useSocket';
import useReservationStore from '../stores/reservationStore';
import { getReservationInfo } from '../apis/reservationAPI';
import PopupReservation from './PopupReservation';
import PopupFail from './PopupFail';

function MainSocket() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { addReservation } = useReservationStore();

  useEffect(() => {
    socket.on('server.make-reservation.store', async (reservationId: number) => {
      const response = await getReservationInfo(reservationId);
      if (!('error' in response)) {
        addReservation(response);
        MySwal.fire({
          html: <PopupReservation item={response} close={Swal.close} navigate={navigate} />,
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
  }, []);

  return <></>;
}

export default MainSocket;

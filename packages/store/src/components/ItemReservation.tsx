import React from 'react';
import styled from 'styled-components';
import thema from '../styles/thema';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../hooks/useSocket';
import useReservationStore from '../stores/reservationStore';
import { deleteReservation } from '../apis/reservationAPI';
import PopupConfirm from './PopupConfirm';
import PopupSuccess from './PopupSuccess';
import PopupFail from './PopupFail';
import type { ReservationDTO } from '../interfaces/reservation';
import type { SocketResponseDTO } from '../interfaces/common';

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 95%;
  min-height: 120px;
  border: 1px solid ${thema.color.secondary.main3};
  padding: 0 18px;
  margin-top: 20px;
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  height: 88px;
  padding-right: 20px;
  border-right: 1.4px solid ${thema.color.secondary.main3};
  font: ${thema.font.h4};
  text-align: center;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;

  & p {
    font: ${thema.font.p2};
    margin-bottom: 2px;
  }
  & p:first-child {
    font: ${thema.font.h4};
    margin-bottom: 6px;
  }
`;
const BtnBox = styled.div`
  position: absolute;
  right: 18px;
  display: flex;

  & button {
    width: 80px;
    height: 84px;
    border: none;
    border-radius: 4px;
    font: ${thema.font.pb2};
  }
  & button:nth-child(1) {
    border: 1px solid ${thema.color.primary.main2};
    background: ${thema.color.primary.main3};
    color: ${thema.color.primary.main2};
  }
  & button:nth-child(2) {
    margin-left: 12px;
    border: 1px solid ${thema.color.alert.red};
    background: ${thema.color.primary.main3};
    color: ${thema.color.alert.red};
  }
  & button:nth-child(3) {
    margin-left: 12px;
    background-color: ${thema.color.primary.main1};
    color: ${thema.color.primary.main2_active};
  }
`;

function ItemReservation({ item }: { item: ReservationDTO }) {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);
  const MySwal = withReactContent(Swal);
  const { removeReservation } = useReservationStore();
  const timeString = new Date(item.estimatedTime).toLocaleTimeString();
  const time = timeString.slice(0, timeString.lastIndexOf(':'));

  function reject() {
    MySwal.fire({
      html: (
        <PopupConfirm
          title="예약취소"
          description={'예약을 취소하시겠습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '480px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit(
          'store.cancel-reservation.server',
          // id와 user아이디를 같이 보낼지 준호와 상의
          item.id,
          async ({ isSuccess, message }: SocketResponseDTO) => {
            if (isSuccess) {
              const response = await deleteReservation(item.id);
              if (typeof response === 'boolean') {
                removeReservation(item);
                MySwal.fire({
                  html: (
                    <PopupSuccess
                      title="예챡취소"
                      description="예약취소에 성공했습니다."
                      close={Swal.clickCancel}
                    />
                  ),
                  showConfirmButton: false,
                  width: '480px',
                  padding: 0,
                  customClass: {
                    popup: 'fail-popup-border',
                  },
                  timer: 2000,
                });
              } else {
                MySwal.fire({
                  html: (
                    <PopupFail
                      title="예약취소"
                      description={response.message}
                      close={Swal.clickCancel}
                    />
                  ),
                  showConfirmButton: false,
                  width: '480px',
                  padding: 0,
                  customClass: {
                    popup: 'fail-popup-border',
                  },
                  timer: 2000,
                });
              }
            } else if (message) {
              MySwal.fire({
                html: <PopupFail title="예약취소" description={message} close={Swal.clickCancel} />,
                showConfirmButton: false,
                width: '480px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            } else {
              MySwal.fire({
                html: (
                  <PopupFail
                    title="예약취소"
                    description="잠시 뒤에 다시 시도하세요."
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '480px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            }
          },
        );
      }
    });
  }

  function checkIn() {
    MySwal.fire({
      html: (
        <PopupConfirm
          title="체크인"
          description={'예약자가 도착했습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '480px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit(
          'store.check-in.server',
          {
            reservationId: item.id,
            userId: item.user.id,
          },
          async ({ isSuccess, message }: SocketResponseDTO) => {
            if (isSuccess) {
              removeReservation(item);
              MySwal.fire({
                html: (
                  <PopupSuccess
                    title="체크인"
                    description="체크인에 성공했습니다."
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '480px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            } else {
              MySwal.fire({
                html: (
                  <PopupFail
                    title="체크인"
                    description={message as string}
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '480px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            }
          },
        );
      }
    });
  }

  return (
    <ItemContainer>
      <TimeBox>{time}</TimeBox>
      <InfoBox>
        <p>
          {item.user.name} 외 {item.numberOfPeople - 1}명
        </p>
        <p>{item.user.phone}</p>
        <p>신용등급 : {item.user.creditRate}점</p>
      </InfoBox>
      <BtnBox>
        <button>위치확인</button>
        <button onClick={reject}>예약취소</button>
        <button onClick={checkIn}>체크인</button>
      </BtnBox>
    </ItemContainer>
  );
}

export default ItemReservation;

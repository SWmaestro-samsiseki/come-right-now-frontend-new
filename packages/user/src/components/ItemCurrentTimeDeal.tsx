import { useEffect, useState } from 'react';
import styled from 'styled-components';
import thema from '../styles/thema';
import useSocket from '../hooks/useSocket';
import useAuthStore from '../stores/authStore';
import useTimeDealStore from '../stores/timeDealStore';
import { deleteParticipant } from '../apis/timeDealAPI';
import { popupConfirm, popupSuccess, popupFail, popupMap } from '../utils/popup';
import type { CurrentTimeDealDTO } from '../interfaces/timeDeal';

const Container = styled.div`
  display: flex;
  width: calc(100vw - 40px);
  flex-wrap: wrap;
  height: 142px;
  margin: 10px 20px;
  padding: 16px 20px;
  background: ${thema.color.primary.main3};
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;
const ImageBox = styled.div`
  width: 70px;
  height: 70px;
  background: ${thema.color.secondary.main2};

  & img {
    width: 100%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;

  & p:nth-child(1) span:nth-child(1) {
    font: ${thema.font.pb1};
    color: ${thema.color.primary.main2};
  }
  & p:nth-child(1) span:nth-child(2) {
    margin-left: 8px;
    font: ${thema.font.p2};
    color: ${thema.color.secondary.main4};
  }
  & p:nth-child(1) button {
    width: 58px;
    height: 20px;
    margin-left: 8px;
    background: ${thema.color.secondary.main2};
    border: 1px solid ${thema.color.primary.main2_active};
    border-radius: 2px;
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2_active};
  }
  & p:nth-child(2) {
    margin-top: 4px;
    font: ${thema.font.p3};
    color: ${thema.color.primary.main2_active};
  }
  & p:nth-child(3) {
    margin-top: 2px;
    font: ${thema.font.pb2};
    color: ${thema.color.alert.green};
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;

  & button {
    width: 48%;
    height: 70%;
    background: ${thema.color.secondary.main2_active};
    border: none;
    border-radius: 4px;
    font: ${thema.font.p3};
  }
`;

function ItemCurrentTimeDeal({ item }: { item: CurrentTimeDealDTO }) {
  const [limitTime] = useState(new Date(item.endTime).getTime());
  const [isArrived] = useState(item.status === 'ARRIVED');
  const { latitude, longitude } = useAuthStore();
  const { removeCurrentTimeDeal } = useTimeDealStore();
  const { socket } = useSocket(localStorage.getItem('token') as string);

  function calLimitTime(time: Date): string {
    const limit = new Date(time);
    const H = limit.getHours();
    const M = limit.getMinutes();
    return `${H < 12 ? '오전 ' + H : '오후 ' + (H - 12)}시 ${M < 10 ? '0' + M : M}분`;
  }

  function checkIn() {
    popupConfirm('체크인', '가게에 도착했습니까?').then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        socket.emit(
          'user.check-in-time-deal-test.server',
          {
            participantId: item.participantId,
            storeId: item.storeId,
            latitude,
            longitude,
          },
          (response: { isSuccess: boolean; message?: string }) => {
            if (response.message !== undefined) {
              if (response.isSuccess) {
                popupSuccess('체크인', '체크인되었습니다! :)', 2000);
              } else {
                popupFail('체크인', response.message, 2000);
              }
            } else {
              popupFail('체크인', '체크인에 실패했습니다! :(', 2000);
            }
          },
        );
      }
    });
  }

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const currentTime = new Date().getTime();
      if (currentTime > limitTime) {
        if (item.status === 'REQUESTED') {
          const response = await deleteParticipant(item.participantId);
          if (typeof response === 'boolean') {
            clearInterval(intervalId);
            removeCurrentTimeDeal(item);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <ImageBox>
        {item.storeImage ? <img src={item.storeImage} alt="가게 이미지" /> : null}
      </ImageBox>
      <InfoBox>
        <p>
          <span>{item.businessName}</span>
          <span>{item.distance}m</span>
        </p>
        <p>
          {calLimitTime(item.endTime)}
          까지 방문시
        </p>
        <p>{item.benefit}</p>
      </InfoBox>
      <BtnBox>
        <button
          onClick={() => {
            popupMap(item.latitude, item.longitude);
          }}>
          지도보기
        </button>
        <button onClick={checkIn} disabled={isArrived}>
          체크인
        </button>
      </BtnBox>
    </Container>
  );
}

export default ItemCurrentTimeDeal;

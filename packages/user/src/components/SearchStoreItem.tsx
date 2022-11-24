import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useAuthStore from '../stores/authStore';
import useReservationStore from '../stores/reservationStore';
import useSocket from '../hooks/useSocket';
import { getDistance } from '../apis/reservationAPI';
import { popupConfirm, popupFail, popupSuccess } from '../utils/popup';
import type { ReservationDTO } from '../interfaces/reservation';

const BasicInfo = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 5px 15px;
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;

  & button {
    width: 58px;
    height: 24px;
    border: 1px solid ${thema.color.primary.main2};
    border-radius: 4px;
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2};
    background: none;
  }
  & button.done {
    color: ${thema.color.secondary.main3_active};
    border: 1px solid ${thema.color.secondary.main3_active};
  }
  & span {
    margin-top: 4px;
    font: ${thema.font.pb3};
    color: ${thema.color.primary.main2};
  }
  & span.limit {
    color: ${thema.color.alert.red};
  }
`;
const ImageBox = styled.div<{ src: string | null }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: ${(prop) =>
    prop.src
      ? `#F5F5F5 url('${prop.src}') no-repeat left top / cover`
      : thema.color.secondary.main2};
  border-radius: 8px;
`;
const InfoBox = styled.div`
  max-width: 70%;
  height: 90%;
  margin-left: 15px;
`;
const InfoMain = styled.div`
  display: flex;
  align-items: center;
  height: 50%;

  & span:nth-child(1) {
    font: ${thema.font.p2};
    color: ${thema.color.primary.main2};
  }
  & span:nth-child(2) {
    margin-left: 5px;
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main4};
  }
`;
const InfoSub = styled.div`
  display: flex;
  align-items: center;
  height: 50%;

  & span:nth-child(1) {
    display: flex;
    align-items: center;
    font: ${thema.font.p2};
    color: ${thema.color.primary.main2};
  }
  & span:nth-child(2) {
    margin-left: 10px;
    font: ${thema.font.p2};
    color: ${thema.color.alert.blue};
  }
  & span:nth-child(3) {
    margin-left: 5px;
  }
`;
const DetailInfo = styled.div<{ show: boolean }>`
  display: ${(prop) => (prop.show ? 'inline-block' : 'none')};
  width: 100%;
  height: fit-content;
  padding: 14px 20px;
  font: ${thema.font.p2};
  background: ${thema.color.secondary.main2};

  & p {
    margin: 1px 0;
  }

  & span {
    font: ${thema.font.pb2};
  }
`;

function SearchStoreItem({ item, map }: { item: ReservationDTO; map: naver.maps.Map | null }) {
  const [isLimit, setIsLimit] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [distance, setDistance] = useState('');
  const [limitTime] = useState(new Date().getTime() + 180000);
  const [time, setTime] = useState('03:00');
  const navigate = useNavigate();
  const { latitude, longitude } = useAuthStore();
  const { addReservation } = useReservationStore();
  const { socket } = useSocket(localStorage.getItem('token') as string);

  function reservation(name: string) {
    popupConfirm('예약', `${name}에 예약하시겠습니까?`).then((result) => {
      if (result.isConfirmed) {
        socket.emit(
          'user.make-reservation.server',
          { storeId: item.store.id, reservationId: item.id },
          (response: boolean) => {
            if (response) {
              addReservation(item);
              navigate('/main', { replace: true });
              popupSuccess('예약', '예약에 성공했습니다!', 2000);
            } else {
              popupFail('예약', '예약에 실패했습니다!', 2000);
            }
          },
        );
      }
    });
  }

  function showDetail() {
    setIsDetail(!isDetail);
  }

  const fetchDistance = async (id: string, latitude: number, longitude: number) => {
    const response = await getDistance(id, latitude, longitude);
    console.log(response);

    if (!('error' in response)) {
      setDistance(String(response.distanceMeter));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const total = limitTime - new Date().getTime();
      const min = Math.floor(total / 60000);
      const sec = Math.floor((total % 60000) / 1000);
      if (min === 0) {
        setIsLimit(true);
      }
      if (min <= 0 && sec <= 0) {
        clearInterval(intervalId);
        setTime(`00:00`);
        setIsDone(true);
      } else setTime(`0${min}:${sec < 10 ? '0' + sec : sec}`);
    }, 1000);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchDistance(item.store.id, latitude, longitude);
    }
  }, []);

  return (
    <div>
      <BasicInfo>
        <InfoContainer>
          <ImageBox src={item.store.storeImage} />
          <InfoBox>
            <InfoMain>
              <span>{item.store.businessName}</span>
              <span>{item.store.storeType}</span>
            </InfoMain>
            <InfoSub>
              <span>
                <img src={require('../images/star_on.png')} alt="평점 이미지" width={18} />
                {item.store.starRate}/5.0
              </span>
              <span>{distance}m</span>
              <span onClick={showDetail}>
                <img
                  src={require(`../images/${isDetail ? 'up' : 'down'}.png`)}
                  alt="더보기 아이콘"
                />
              </span>
            </InfoSub>
          </InfoBox>
        </InfoContainer>
        <BtnContainer>
          <button
            className={isDone ? 'done' : ''}
            onClick={() => {
              reservation(item.store.businessName);
            }}
            disabled={isDone}>
            예약
          </button>
          <span className={isLimit ? 'limit' : ''}>{time}</span>
        </BtnContainer>
      </BasicInfo>
      <DetailInfo show={isDetail}>
        <p>
          <span>주소:</span> {item.store.address}
        </p>
        <p>
          <span>전화:</span> {item.store.storePhone}
        </p>
        <p>
          <span>영업시간: </span>
          {item.store.todayOpenAt ? item.store.todayOpenAt.toString() : null} -{' '}
          {item.store.todayCloseAt ? item.store.todayCloseAt.toString() : null}
        </p>
        <p>
          <span>대표메뉴: </span>
          {[item.store.mainMenu1, item.store.mainMenu2, item.store.mainMenu3]
            .filter((ele) => ele !== null)
            .join(', ')}
        </p>
      </DetailInfo>
    </div>
  );
}

export default SearchStoreItem;

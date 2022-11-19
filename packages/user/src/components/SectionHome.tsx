import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useAuthStore from '../stores/authStore';
import useReservationStore from '../stores/reservationStore';
import useTimeDealStore from '../stores/timeDealStore';
import { getReservation } from '../apis/reservationAPI';
import { getTimeDealList, getCurrenTimeDealList } from '../apis/timeDealAPI';
import HomeHeader from '../components/HomeHeader';
import ReservationContainer from './ReservationContainer';
import CurrentTimeDealContainer from './CurrentTimeDealContainer';
import TimeDealContainer from './TimeDealContainer';
import EmptyBar from './EmptyBar';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 88px);
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const RequestBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 48px;
  margin: 20px;
  background: ${(props) =>
    props.disabled ? thema.color.secondary.main3 : thema.color.primary.main1};
  border: none;
  border-radius: 4px;
  font: ${thema.font.pb2};
  color: ${(props) => (props.disabled ? thema.color.secondary.main4 : thema.color.primary.main2)};
  text-decoration: none;
`;

function SectionHome() {
  const navigate = useNavigate();
  const { auth, latitude, longitude } = useAuthStore();
  const { reservation, addReservation } = useReservationStore();
  const [isReservation, setIsReservation] = useState(false);
  const { initTimeDeal, initCurrentTimeDeal } = useTimeDealStore();

  const fetchReservation = async (id: string) => {
    const response = await getReservation(id);
    if (!('error' in response)) {
      addReservation(response[0]);
    } else {
      console.log(response.message);
    }
  };
  const fetchTimeDealList = async (latitude: number, longitude: number) => {
    const response = await getTimeDealList(latitude, longitude);
    if (!('error' in response)) {
      initTimeDeal(response);
    } else {
      console.log(response.message);
    }
  };
  const fetchCurrentTimeDeal = async (latitude: number, longitude: number) => {
    const response = await getCurrenTimeDealList(latitude, longitude);
    if (!('error' in response)) {
      initCurrentTimeDeal(response);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchReservation(auth.id);
    }
  }, [auth]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimeDealList(latitude, longitude);
      fetchCurrentTimeDeal(latitude, longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (reservation) {
      setIsReservation(true);
    } else {
      setIsReservation(false);
    }
  }, [reservation]);

  return (
    <MainContainer>
      <HomeHeader />
      <Contents>
        <EmptyBar value={10} />
        <ReservationContainer />
        <EmptyBar value={20} />
        <CurrentTimeDealContainer />
        <EmptyBar value={20} />
        <TimeDealContainer />
      </Contents>
      <RequestBtn
        onClick={() => {
          navigate('/request', { replace: true });
        }}
        disabled={isReservation}>
        + 실시간 예약
      </RequestBtn>
    </MainContainer>
  );
}

export default SectionHome;

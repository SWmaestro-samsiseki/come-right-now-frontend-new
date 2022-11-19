import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useReservationStore from '../stores/reservationStore';
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
  const [isReservation, setIsReservation] = useState(false);
  const navigate = useNavigate();
  const { reservation } = useReservationStore();

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

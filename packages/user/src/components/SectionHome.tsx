import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useReservationStore from '../stores/reservationStore';
import HomeHeader from '../components/HomeHeader';
import ReservationContainer from './ReservationContainer';
import CurrentTimeDealContainer from './CurrentTimeDealContainer';
import TimeDealContainer from './TimeDealContainer';

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
interface size {
  h: number;
}
const TermDivBox = styled.div<size>`
  width: 100%;
  min-height: ${(props) => props.h + 'px'};
`;

function SectionHome() {
  const { reservation } = useReservationStore();
  const [isReservation, setIsReservation] = useState(false);
  const navigate = useNavigate();

  function next() {
    navigate('/request', { replace: true });
  }

  useEffect(() => {
    if (reservation !== null) setIsReservation(true);
    else setIsReservation(false);
  }, [reservation]);

  return (
    <MainContainer>
      <HomeHeader />
      <Contents>
        <ReservationContainer />
        <TermDivBox h={20} />
        <CurrentTimeDealContainer />
        <TermDivBox h={20} />
        <TimeDealContainer />
      </Contents>
      <RequestBtn onClick={next} disabled={isReservation}>
        + 실시간 예약
      </RequestBtn>
    </MainContainer>
  );
}

export default SectionHome;

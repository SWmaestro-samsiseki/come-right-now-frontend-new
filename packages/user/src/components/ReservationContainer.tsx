import styled from 'styled-components';
import thema from '../styles/thema';
import useReservationStore from '../stores/reservationStore';
import ReservationItem from './ReservationItem';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: fit-content;
  border-radius: 8px;
`;

const EmptyReservation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 185px;
  font: ${thema.font.p2};
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;

function ReservationContainer() {
  const { reservation } = useReservationStore();

  return (
    <Container>
      {reservation ? (
        <ReservationItem reservation={reservation} />
      ) : (
        <EmptyReservation>예약 내역이 없습니다.</EmptyReservation>
      )}
    </Container>
  );
}

export default ReservationContainer;

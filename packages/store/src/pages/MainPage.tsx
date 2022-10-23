import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../stores/authStore';
import useReservationStore from '../stores/reservationStore';
import useTimeDealStore from '../stores/timeDealStore';
import { getStoreInfo } from '../apis/authAPI';
import { getReservationList } from '../apis/reservationAPI';
import { getTimeDealList } from '../apis/timeDealAPI';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import MainAd from '../components/MainAd';
import MainSocket from '../components/MainSocket';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const { setAuth } = useAuthStore();
  const { initStandList, initReservationList } = useReservationStore();
  const { initTimeDeal } = useTimeDealStore();

  // stand랑 reservation은 없으면 빈 배열 주는데, timeDeal은 왜 오류?
  async function init() {
    const response = await getStoreInfo();
    if (!('error' in response)) {
      setAuth(response);
      const standResponse = await getReservationList(response.id, 'requested');
      if (!('error' in standResponse)) {
        initStandList(standResponse);
      } else {
        console.log(standResponse.message);
      }
      const reservationResponse = await getReservationList(response.id, 'reserved');
      if (!('error' in reservationResponse)) {
        initReservationList(reservationResponse);
      } else {
        console.log(reservationResponse.message);
      }
      const timeDealResponse = await getTimeDealList(response.id);
      if (!('error' in timeDealResponse)) {
        initTimeDeal(timeDealResponse);
      } else {
        console.log(timeDealResponse.message);
      }
    } else {
      console.log(response.message);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <MainHeader />
      <MainSection />
      <MainAd />
      <MainSocket />
    </Container>
  );
}

export default MainPage;

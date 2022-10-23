import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../stores/authStore';
import useReservationStore from '../stores/reservationStore';
import { getStoreInfo } from '../apis/authAPI';
import { getStandList, getReservationList } from '../apis/reservationAPI';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import MainAd from '../components/MainAd';
// import type { StoreAuth } from '../../utils/interface';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const { setAuth } = useAuthStore();
  const { initStandList } = useReservationStore();

  async function init() {
    const response = await getStoreInfo();
    if (!('error' in response)) {
      setAuth(response);
      const standResposne = await getStandList(response.id);
      if (!('error' in standResposne)) {
        initStandList(standResposne);
      } else {
        console.log(standResposne.message);
      }
      const reservationResponse = await getReservationList(response.id);
      if (!('error' in reservationResponse)) {
        initStandList(reservationResponse);
      } else {
        console.log(reservationResponse.message);
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
    </Container>
  );
}

export default MainPage;

import { useEffect } from 'react';
import styled from 'styled-components';
import useSocket from '../hooks/useSocket';
import useRequestInfoStore from '../stores/requestInfoStore';
import MainSection from '../components/MainSection';
import MainMenu from '../components/MainMenu';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const { socket } = useSocket(localStorage.getItem('token') as string);
  const { setLatitude, setLongitude } = useRequestInfoStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log('위치를 가져오는데 성공했습니다.');
      },
      () => {
        console.log('위치를 가져오는데 실패했습니다.');
      },
    );
  }, []);

  return (
    <Container>
      <MainSection />
      <MainMenu />
    </Container>
  );
}

export default MainPage;

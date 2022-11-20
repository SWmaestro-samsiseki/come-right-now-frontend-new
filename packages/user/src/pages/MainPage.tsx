import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '../stores/authStore';
import useReservationStore from '../stores/reservationStore';
import MainSection from '../components/MainSection';
import MainMenu from '../components/MainMenu';
import { getUserInfo } from '../apis/authAPI';
import { getCategory } from '../apis/reservationAPI';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const navigate = useNavigate();
  const { setAuthorized, setAuth } = useAuthStore();
  const { initCategory } = useReservationStore();

  const fetchUserInfo = async () => {
    const response = await getUserInfo();
    if (!('error' in response)) {
      setAuth(response);
    } else {
      localStorage.removeItem('token');
      setAuthorized();
      navigate('/login', { replace: true });
    }
  };

  const fetchCategory = async () => {
    const response = await getCategory();
    if (!('error' in response)) {
      initCategory(response);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchCategory();
  }, []);

  return (
    <Container>
      <MainSection />
      <MainMenu />
    </Container>
  );
}

export default MainPage;

import styled from 'styled-components';
import useSocket from '../hooks/useSocket';
import MainSection from '../components/MainSection';
import MainMenu from '../components/MainMenu';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const { socket } = useSocket(localStorage.getItem('token') as string);

  return (
    <Container>
      <MainSection />
      <MainMenu />
    </Container>
  );
}

export default MainPage;

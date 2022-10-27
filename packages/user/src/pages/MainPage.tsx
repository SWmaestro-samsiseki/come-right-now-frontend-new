import styled from 'styled-components';
import useSocket from '../hooks/useSocket';
import MainSection from '../components/MainSection';
import MainMenu from '../components/MainMenu';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);

  return (
    <Container>
      <MainSection />
      <MainMenu />
    </Container>
  );
}

export default MainPage;

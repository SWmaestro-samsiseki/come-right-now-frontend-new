import styled from 'styled-components';
import MainSection from '../components/MainSection';
import MainMenu from '../components/MainMenu';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function MainPage() {
  return (
    <Container>
      <MainSection />
      <MainMenu />
    </Container>
  );
}

export default MainPage;

import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SectionHome from '../components/SectionHome';
import SectionStar from '../components/SectionStar';
import SectionTimeDeal from '../components/SectionTimeDeal';
import SectionMyPage from '../components/SectionMyPage';

const SectionContainer = styled.section`
  width: 100%;
  height: 92%;
`;

function MainSection() {
  return (
    <SectionContainer>
      <Routes>
        <Route path="" element={<SectionHome />} />
        <Route path="star" element={<SectionStar />} />
        <Route path="timedeal" element={<SectionTimeDeal />} />
        <Route path="mypage" element={<SectionMyPage />} />
      </Routes>
    </SectionContainer>
  );
}

export default MainSection;

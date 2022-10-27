import React from 'react';
import styled from 'styled-components';
import MenuHeader from './MenuHeader';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function SectionStar() {
  return (
    <Container>
      <MenuHeader title={'찜'} />
    </Container>
  );
}
export default SectionStar;

import React from 'react';
import styled from 'styled-components';
import useStarStore from '../stores/starStore';
import MenuHeader from './MenuHeader';
import ListEmpty from './ListEmpty';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 0;
  overflow-y: scroll;
`;

function SectionStar() {
  const { starList } = useStarStore();
  return (
    <Container>
      <MenuHeader title={'찜'} />
      <StarContainer>
        {starList.length !== 0 ? null : <ListEmpty text={'나의 찜 목록이 없습니다 :0'} />}
      </StarContainer>
    </Container>
  );
}
export default SectionStar;

import { useEffect } from 'react';
import styled from 'styled-components';
import thema from '../styles/thema';
import useAuthStore from '../stores/authStore';
import useTimeDealStore from '../stores/timeDealStore';
import { getTimeDealList } from '../apis/timeDealAPI';
import MenuHeader from './MenuHeader';
import ItemTimeDeal from './ItemTimeDeal';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px 0;
  overflow-y: scroll;

  & > div {
    margin-bottom: 20px;
  }
  & > div:last-child {
    margin: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const EmtpyHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2_active};

  & img {
    width: 140px;
    margin-bottom: 12px;
  }
`;

function SectionTimeDeal() {
  const { latitude, longitude } = useAuthStore();
  const { timeDealList, initTimeDeal } = useTimeDealStore();

  async function fetchTimeDeal(latitude: number, longitude: number) {
    const response = await getTimeDealList(latitude, longitude);
    if (!('error' in response)) {
      initTimeDeal(response);
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimeDeal(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <Container>
      <MenuHeader title={'오늘의 타임 딜'} />
      <ListContainer>
        {timeDealList.length !== 0 ? (
          timeDealList.map((item, index) => <ItemTimeDeal key={index} item={item}></ItemTimeDeal>)
        ) : (
          <EmtpyHistory>
            <img
              src={
                'https://s3.ap-northeast-2.amazonaws.com/static.jigeumgo.com/images/emtpyHistory.png'
              }
              alt="빈 이미지"
            />
            오늘의 타임딜이 없습니다 :0
          </EmtpyHistory>
        )}
      </ListContainer>
    </Container>
  );
}

export default SectionTimeDeal;

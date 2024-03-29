import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useTimeDealStore from '../stores/timeDealStore';
import ItemTimeDeal from './ItemTimeDeal';
import type { TimeDealUserDTO } from '../interfaces/timeDeal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 211px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 22px;
  padding: 0 20px;

  & p:first-child {
    font: ${thema.font.p1};
    color: ${thema.color.primary.main2};
  }
  & p:last-child {
    font: ${thema.font.pb3};
    color: ${thema.color.secondary.main4};
  }
`;
const Content = styled.div`
  width: 100%;
  height: 179px;
  overflow-x: scroll;
  overflow-y: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Slider = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
`;
const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: 100%;
  margin: 0 auto;
  font: ${thema.font.p2};
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;
const MoreBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;

  & div {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 25px;
    font: ${thema.font.p3};
    background: ${thema.color.secondary.main2_active};
  }
`;

function TimeDealContainer() {
  const navigate = useNavigate();
  const [list, setList] = useState<TimeDealUserDTO[]>([]);
  const { timeDealList } = useTimeDealStore();

  function showMoreTimeDeal() {
    navigate('timedeal', { replace: true });
  }

  useEffect(() => {
    if (timeDealList.length > 5) {
      setList(timeDealList.slice(0, 5));
    } else {
      setList(timeDealList);
    }
  }, [timeDealList]);

  return (
    <Container>
      <Header>
        <p>오늘의 타임딜</p>
        <p onClick={showMoreTimeDeal}>더보기 {'>'}</p>
      </Header>
      <Content>
        {list.length === 0 ? (
          <EmptyBox>현재 타임딜이 없습니다.</EmptyBox>
        ) : (
          <Slider>
            {list.map((item, index) => (
              <ItemTimeDeal key={index} item={item}></ItemTimeDeal>
            ))}
            {timeDealList.length > 5 ? (
              <MoreBox>
                <div onClick={showMoreTimeDeal}>더보기</div>
              </MoreBox>
            ) : null}
          </Slider>
        )}
      </Content>
    </Container>
  );
}

export default TimeDealContainer;

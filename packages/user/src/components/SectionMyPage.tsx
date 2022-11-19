import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import thema from '../styles/thema';
import useAuthStore from '../stores/authStore';
import MenuHeader from './MenuHeader';
import HistoryContainer from './HistoryContainer';
import type { UserAuth } from '../interfaces/auth';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: 1s;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Slider = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  width: 200%;
  height: 100%;
  transition: 0.7s;

  &.selected {
    left: -100%;
  }
`;
const SubSection = styled.div`
  width: 50%;
  min-width: 50%;
  height: 100%;
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 78px;
  padding-top: 22px;

  &:active {
    background: ${thema.color.secondary.main2};
  }
  & > div p:first-child {
    margin-bottom: 4px;
    font: ${thema.font.p2};
    color: ${thema.color.primary.main2};
  }
  & > div p:last-child {
    font: ${thema.font.p3};
    color: ${thema.color.secondary.main3_active};
  }
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 46px;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2};

  &:active {
    background: ${thema.color.secondary.main2};
  }
  & > div {
    display: flex;
    align-items: center;
  }
  & > div img {
    margin-left: 4px;
  }
  & > span {
    color: ${thema.color.alert.blue};
  }
`;
const SubHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  min-height: 50px;
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main2};
  background: ${thema.color.primary.main3};
  box-shadow: 0px 0.5px 0px rgba(0, 0, 0, 0.16);

  & img {
    position: absolute;
    left: 20px;
  }
`;

function SectionTimeDeal() {
  const [user, setUser] = useState<UserAuth>();
  const [menuSelect, setMenuSelect] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');
  const { auth } = useAuthStore();

  function select(e: React.MouseEvent) {
    const type = (e.target as Element).getAttribute('data-menu');
    if (type) {
      setMenuSelect(true);
      setMenuTitle(type as string);
    }
  }
  function unSelect() {
    setMenuSelect(false);
  }

  useEffect(() => {
    if (auth) {
      if ('creditRate' in auth) {
        setUser(auth);
      }
    }
  }, [auth]);

  return (
    <Container>
      <Slider className={menuSelect ? 'selected' : ''}>
        <SubSection onClick={select}>
          <MenuHeader title={'My 지금갈게'} />
          <ProfileBox data-menu="Profile">
            <div>
              <p>{user?.name}님 안녕하세요.</p>
              <p>{user?.email}</p>
            </div>
            <span>
              <img src={require('../images/next.png')} alt="다음 이미지" />
            </span>
          </ProfileBox>
          <ItemBox>
            <div>
              <p>신용등급</p>
              <img src={require('../images/Q.png')} alt="물음표 이미지" />
            </div>
            <span>{user?.creditRate}점</span>
          </ItemBox>
          <ItemBox data-menu="이용내역">
            <div>이용내역</div>
            <span>
              <img src={require('../images/next.png')} alt="다음 이미지" />
            </span>
          </ItemBox>
          <ItemBox data-menu="이벤트">
            <div>이벤트</div>
            <span>
              <img src={require('../images/next.png')} alt="다음 이미지" />
            </span>
          </ItemBox>
          <ItemBox data-menu="환경설정">
            <div>환경설정</div>
            <span>
              <img src={require('../images/next.png')} alt="다음 이미지" />
            </span>
          </ItemBox>
        </SubSection>
        <SubSection>
          <SubHeader>
            {menuTitle}
            <img src={require('../images/back.png')} alt="이전 이미지" onClick={unSelect} />
          </SubHeader>
          {menuTitle === '이용내역' ? (
            <HistoryContainer />
          ) : menuTitle === '이벤트' ? null : menuTitle === '환경설정' ? null : null}
        </SubSection>
      </Slider>
    </Container>
  );
}

export default SectionTimeDeal;

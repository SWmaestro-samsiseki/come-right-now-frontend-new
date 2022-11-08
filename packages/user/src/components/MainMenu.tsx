import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';

const Container = styled.nav`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8%;
  border-top: 1px solid ${thema.color.secondary.main3};
`;
const Menu = styled.ul`
  display: flex;
  height: 100%;
`;
const MenuItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  text-decoration: none;
  & li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font: ${thema.font.p3};
    color: ${thema.color.primary.main2};
  }
  & li span {
    margin-top: 5px;
  }
`;

function UserMenu() {
  const param = useParams();

  return (
    <Container>
      <Menu>
        <MenuItem to="/main" replace={true}>
          <li>
            <img
              src={require(`../images/home_${param['*'] === '' ? 'on' : 'off'}.png`)}
              alt="홈 아이콘"
            />
            <span>홈</span>
          </li>
        </MenuItem>
        <MenuItem to="/main/star" replace={true}>
          <li>
            <img
              src={require(`../images/star_${param['*'] === 'star' ? 'on' : 'off'}.png`)}
              alt="찜 아이콘"
            />
            <span>찜</span>
          </li>
        </MenuItem>
        <MenuItem to="/main/timedeal" replace={true}>
          <li>
            <img
              src={require(`../images/time_${param['*'] === 'timedeal' ? 'on' : 'off'}.png`)}
              alt="타임딜 아이콘"
            />
            <span>타임딜</span>
          </li>
        </MenuItem>
        <MenuItem to="/main/mypage" replace={true}>
          <li>
            <img
              src={require(`../images/mypage_${param['*'] === 'mypage' ? 'on' : 'off'}.png`)}
              alt="마이페이지 아이콘"
            />
            <span>My 지금갈게</span>
          </li>
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default UserMenu;

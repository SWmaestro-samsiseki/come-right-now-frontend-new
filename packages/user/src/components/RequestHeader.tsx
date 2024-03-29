import styled from 'styled-components';
import thema from '../styles/thema';
import { Link } from 'react-router-dom';

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
  font: ${thema.font.pb2};
`;
const BackBtn = styled(Link)`
  position: absolute;
  left: 20px;
`;

function UserRequestHeader() {
  return (
    <Header>
      <BackBtn to="/main" replace={true}>
        <img src={require('../images/back.png')} alt="뒤로가기" />
      </BackBtn>
      <h1>주점 찾기</h1>
    </Header>
  );
}

export default UserRequestHeader;

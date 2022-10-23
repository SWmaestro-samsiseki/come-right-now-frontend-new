import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAuthStore from '../stores/authStore';
import { postLogin } from '../apis/authAPI';
import PopupFail from '../components/PopupFail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 560px;
  border: 1px solid ${thema.color.secondary.main3};
  border-radius: 8px;
`;
const Logo = styled.img`
  width: 160px;
  margin: 30px 0 40px;
`;
const InputBox = styled.div`
  position: relative;
  width: 320px;
  height: 40px;
  margin-top: 20px;
  border-radius: 4px;
  background: ${thema.color.secondary.main2};

  & input {
    display: block;
    width: 80%;
    height: 100%;
    padding: 0 15% 0 5%;
    border: none;
    border-radius: 4px;
    font: ${thema.font.p2};
    background: ${thema.color.secondary.main2};
    caret-color: ${thema.color.primary.main1};

    &:focus {
      border-bottom: 1.3px solid ${thema.color.primary.main1};
      outline: none;
    }
    &::placeholder {
      color: ${thema.color.secondary.main3};
    }
  }
  & div {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
    color: ${thema.color.secondary.main3};
  }
`;
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 48px;
  margin-top: 80px;
  border: none;
  border-radius: 4px;
  font: ${thema.font.pb2};
  color: ${(props) => (props.disabled ? thema.color.primary.main3 : thema.color.primary.main2)};
  background: ${(props) =>
    props.disabled ? thema.color.secondary.main3_active : thema.color.primary.main1};

  &:active {
    background: ${(props) =>
      props.disabled ? thema.color.secondary.main3_active : thema.color.primary.main1_active};
  }
`;
const Tooltip = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  font: ${thema.font.h5};
  color: ${thema.color.primary.main3};
  background: ${thema.color.primary.main1};
`;

function LoginPage() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { setAuthorized } = useAuthStore();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  function changeId(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function changePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }
  async function login() {
    const response = await postLogin(email, pw);
    if (!('error' in response)) {
      localStorage.setItem('token', response.accessToken);
      setAuthorized();
      navigate('/main', { replace: true });
    } else {
      MySwal.fire({
        html: <PopupFail title="로그인 실패" description={response.message} close={Swal.close} />,
        showConfirmButton: false,
        width: '480px',
        padding: 0,
        customClass: {
          popup: 'popup-border-radius',
        },
      });
    }
  }

  return (
    <Container>
      <Logo src={require('../images/logo.png')} alt="서비스 로고 이미지" />
      <InputBox>
        <input placeholder="이메일을 입력하세요" value={email} onChange={changeId} />
        <div>
          {email.length === 0 ? null : (
            <i className="fas fa-times-circle" onMouseDown={() => setEmail('')}></i>
          )}
        </div>
      </InputBox>
      <InputBox>
        <input type="password" placeholder="비밀번호를 입력하세요" value={pw} onChange={changePw} />
        <div>
          {pw.length === 0 ? null : (
            <i className="fas fa-times-circle" onMouseDown={() => setPw('')}></i>
          )}
        </div>
      </InputBox>
      <LoginBtn role="button" onClick={login} disabled={email && pw ? false : true}>
        로그인
      </LoginBtn>
      <Tooltip>
        <i className="fas fa-question"></i>
      </Tooltip>
    </Container>
  );
}

export default LoginPage;

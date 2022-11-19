import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from './stores/authStore';
import { getAuthValid } from './apis/authAPI';
import { messageToNative } from './utils/react-native';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RequestPage from './pages/RequestPage';
import SearchPage from './pages/SearchPage';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { authorized, setAuthorized, setLatitude, setLongitude } = useAuthStore();

  async function authValid(): Promise<void> {
    const response = await getAuthValid();
    if (response) {
      setAuthorized();
    }
  }

  useEffect(() => {
    authValid();
  }, []);

  useEffect(() => {
    messageToNative(1);
  }, []);

  useEffect(() => {
    window.addEventListener(
      'message',
      (message) => {
        try {
          const response = message.data;
          const data = JSON.parse(response);
          if (data.type === 'native') {
            if (data.value.type === 1) {
              setLatitude(data.value.value.latitude);
              setLongitude(data.value.value.longitude);
            }
          }
        } catch (err) {
          // native에서 보내는 메세지가 아닌 것들
        }
      },
      false,
    );
  }, []);

  return (
    <Container className="App">
      <Routes>
        <Route
          path="/"
          element={
            authorized ? (
              <Navigate to="/main" replace={true} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/login"
          element={authorized ? <Navigate to="/main" replace={true} /> : <LoginPage />}
        />
        <Route
          path="/main/*"
          element={authorized ? <MainPage /> : <Navigate to="/login" replace={true} />}
        />
        <Route
          path="/request"
          element={authorized ? <RequestPage /> : <Navigate to="/login" replace={true} />}
        />
        <Route
          path="/search"
          element={authorized ? <SearchPage /> : <Navigate to="/login" replace={true} />}
        />
      </Routes>
    </Container>
  );
}

export default App;

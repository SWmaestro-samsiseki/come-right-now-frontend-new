import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from './stores/authStore';
import { getAuthValid } from './apis/authAPI';
import LoginPage from './pages/LoginPage';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const { authorized, setAuthorized } = useAuthStore();

  async function authValid(): Promise<void> {
    const response = await getAuthValid();
    if (response) {
      setAuthorized();
    }
  }

  useEffect(() => {
    authValid();
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
        <Route path="/main" element={null} />
      </Routes>
    </Container>
  );
}

export default App;

import type { ErrorDTO } from '../interfaces/common';
import type { StoreAuth } from '../interfaces/auth';

const BASE_URL = 'http://devserver.jigeumgo.com';

async function getAuthValid(): Promise<boolean> {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/account/validation`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}

async function postLogin(email: string, password: string): Promise<{ token: string } | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '아이디나 비밀번호가 틀렸습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 로그인에 실패했습니다. 잠시후에 다시 시도하세요.',
    };
  }
}

// TODO: 지윤이한테 물어보고 수정
async function getStoreInfo(): Promise<StoreAuth | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/store/my-info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 404) {
        return {
          error: true,
          message: '항목을 찾을 수 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버오류로 인해 사용자 정보를 가져오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 사용자 정보를 가져오지 못했습니다.',
    };
  }
}

export { getAuthValid, postLogin, getStoreInfo };

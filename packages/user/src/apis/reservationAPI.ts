import type { ErrorDTO, Category } from '../interfaces/common';
import type { ReservationDTO, HistoryUserDTO } from '../interfaces/reservation';

const BASE_URL = 'http://devserver.jigeumgo.com';

async function fetchCategories(): Promise<Array<Category>> {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const parse = await response.json();
  return parse;
}

async function getReservation(id: string): Promise<ReservationDTO[] | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/user/${id}?status=reserved`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '예약내역이 없습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
    };
  }
}

async function getReservationInfo(id: number): Promise<ReservationDTO | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 404) {
        return {
          error: true,
          message: '항목을 찾을 수 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버 오류로 인해 예약정보를 가져오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버 오류로 인해 예약정보를 가져오지 못했습니다.',
    };
  }
}

async function deleteReservation(id: number): Promise<boolean | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      return true;
    } else {
      return {
        error: true,
        message: '예약내역이 없습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약취소에 실패했습니다.',
    };
  }
}

async function getReservationHistory(id: string): Promise<HistoryUserDTO[][] | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/user/${id}?status=arrived&order=date`);
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약내역을 가져오지 못했습니다.',
    };
  }
}

async function getDistance(
  id: string,
  latitude: number,
  longitude: number,
): Promise<{ distanceMeter: number } | ErrorDTO> {
  try {
    const response = await fetch(
      `${BASE_URL}/store/${id}/distance?latitude=${latitude}&longitude=${longitude}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    if (response.ok) {
      return await response.json();
    } else {
      return {
        error: true,
        message: '서버오류로 인해 거리를 가져오지 못했습니다.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 거리를 가져오지 못했습니다.',
    };
  }
}

export {
  fetchCategories,
  getReservation,
  getReservationInfo,
  deleteReservation,
  getReservationHistory,
  getDistance,
};

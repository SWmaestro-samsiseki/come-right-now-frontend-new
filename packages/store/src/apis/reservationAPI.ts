import type { ErrorDTO } from '../interfaces/common';
import type { ReservationDTO } from '../interfaces/reservation';

const BASE_URL = 'http://devserver.jigeumgo.com';

async function getReservationList(
  id: string,
  status: string,
): Promise<ReservationDTO[] | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/reservation/store/${id}?status=${status}`, {
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
          message: '서버 오류로 인해 대기목록을 가져오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버 오류로 인해 대기목록을 가져오지 못했습니다.',
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
      if (response.status === 404) {
        return {
          error: true,
          message: '항목을 찾을 수 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버 오류로 인해 예약을 삭제하지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 예약을 삭제하지 못했습니다.',
    };
  }
}

export { getReservationList, getReservationInfo, deleteReservation };

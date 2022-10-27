import type { ErrorDTO } from '../interfaces/common';
import type { HistoryUserDTO } from '../interfaces/reservation';

const BASE_URL = 'http://devserver.jigeumgo.com';

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

export { getReservationHistory };

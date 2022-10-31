import type { TimeDealStoreDTO, CheckInUserDTO } from '../interfaces/timeDeal';
import type { ErrorDTO } from '../interfaces/common';

const BASE_URL = 'http://devserver.jigeumgo.com';

async function postTimeDeal(
  duration: number,
  benefit: string,
): Promise<TimeDealStoreDTO | ErrorDTO> {
  try {
    const resposne = await fetch(`${BASE_URL}/time-deal`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        duration,
        benefit,
      }),
    });
    if (resposne.ok) {
      return await resposne.json();
    } else {
      // TODO: 실패하는 경우가 뭐뭐가 있는지 준호와 상의, 지금은 404만 있음.
      return {
        error: true,
        message: '타임딜 게시에 실패했습니다. 잠시뒤에 다시 시도하세요.',
      };
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 타임딜 게시에 실패했습니다.',
    };
  }
}

async function getTimeDealList(storeId: string): Promise<TimeDealStoreDTO[] | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/time-deal/store?storeId=${storeId}`, {
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
          message: '타임딜 항목이 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버오류로 인해 타임딜목록을 받아오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 타임딜목록을 받아오지 못했습니다.',
    };
  }
}

async function patchCloseTimeDeal(timeDealId: number): Promise<boolean | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/time-deal/${timeDealId}/close`, {
      method: 'PATCH',
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
          message: `서버오류로 인해 타임딜을 종료하지 못했습니다.`,
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: `서버오류로 인해 타임딜을 종료하지 못했습니다.`,
    };
  }
}

async function getParcitipantInfoByStore(
  participantId: number,
): Promise<CheckInUserDTO | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/participant/${participantId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      if (response.status === 404) {
        return {
          error: true,
          message: '체크인 내역이 없습니다.',
        };
      } else {
        return {
          error: true,
          message: '서버오류로 인해 타임딜목록을 받아오지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 사용자 정보를 받아오지 못했습니다.',
    };
  }
}

async function deleteParticipant(participantId: number): Promise<boolean | ErrorDTO> {
  try {
    const response = await fetch(`${BASE_URL}/participant/${participantId}`, {
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
          message: '서버오류로 인해 체크아웃을 처리하지 못했습니다.',
        };
      }
    }
  } catch (err) {
    return {
      error: true,
      message: '서버오류로 인해 체크아웃을 처리하지 못했습니다.',
    };
  }
}

export {
  postTimeDeal,
  getTimeDealList,
  patchCloseTimeDeal,
  getParcitipantInfoByStore,
  deleteParticipant,
};

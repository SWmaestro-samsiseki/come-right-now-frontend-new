import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import thema from '../styles/thema';
import useAuthStore from '../stores/authStore';
import useRequestInfoStore from '../stores/requestInfoStore';
import useSocket from '../hooks/useSocket';
import RequestHeader from '../components/RequestHeader';
import RequestStep from '../components/RequestStep';
import RequestCategory from '../components/RequestCategory';
import RequestStatus from '../components/RequestStatus';
import { popupConfirm, popupFail } from '../utils/popup';

const RequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const SearchBtn = styled.button`
  position: fixed;
  bottom: 0;
  width: 320px;
  height: 48px;
  margin: 20px;
  font: ${thema.font.pb2};
  color: ${thema.color.primary.main3};
  background: ${thema.color.secondary.main3};
  border: none;
  border-radius: 4px;

  &.active {
    background: ${thema.color.primary.main1};
    color: ${thema.color.primary.main2};
  }
  &:active {
    background: ${thema.color.primary.main1_active};
  }
`;

function RequestPage() {
  const navigate = useNavigate();
  const { latitude, longitude } = useAuthStore();
  const { selectedCategories, people, time } = useRequestInfoStore();
  const { socket } = useSocket(localStorage.getItem('token') as string);

  function findStore() {
    if (latitude && longitude) {
      socket.emit(
        'user.find-store.server',
        {
          categories: selectedCategories.map((ele) => ele.id),
          numberOfPeople: people,
          delayMinutes: time,
          longitude: longitude,
          latitude: latitude,
        },
        (response: boolean) => {
          if (response) {
            navigate('/search');
          } else {
            popupConfirm('탐색', '주번에 가게가 없습니다. 더 넓은 범위로 탐색하시겠습니까?').then(
              ({ isConfirmed }) => {
                if (isConfirmed) {
                  socket.emit(
                    'user.find-store-further.server',
                    {
                      categories: selectedCategories.map((ele) => ele.id),
                      numberOfPeople: people,
                      delayMinutes: time,
                      longitude: longitude,
                      latitude: latitude,
                    },
                    (response: boolean) => {
                      if (response) {
                        navigate('/search');
                      } else {
                        popupFail('탐색', '탐색에 실패했습니다. 다른 곳으로 이동하십시오.', 2000);
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    }
  }

  return (
    <RequestContainer>
      <RequestHeader />
      <RequestStep step={1} name={'주종'} />
      <RequestCategory />
      <RequestStep step={2} name={'인원'} />
      <RequestStatus type={'people'} />
      <RequestStep step={3} name={'시간'} />
      <RequestStatus type={'time'} />
      <SearchBtn
        onClick={findStore}
        className={selectedCategories.length > 0 ? 'active' : ''}
        disabled={selectedCategories.length > 0 ? false : true}>
        지금갈게
      </SearchBtn>
    </RequestContainer>
  );
}

export default RequestPage;
